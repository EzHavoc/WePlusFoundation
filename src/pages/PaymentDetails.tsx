import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSuccessDialog from "@/components/PaymentSuccessDialog";

interface DonationDetails {
  id: string;
  name: string;
  email: string;
  amount: number;
  pan: string;
  status: string;
  created_at: string;
  transaction_id?: string;
}

const transactionFormSchema = z.object({
  transaction_id: z.string().min(1, "Please enter the transaction ID"),
});

export default function PaymentDetails() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const donationId = searchParams.get('donation_id');
  const email = searchParams.get('email');

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transaction_id: "",
    },
  });

  useEffect(() => {
    async function fetchDonation() {
      if (!donationId && !email) {
        setLoading(false);
        return;
      }

      try {
        const query = supabase
          .from('donations')
          .select('*')
          .eq('id', donationId)
          .eq('email', email)
          .single();

        const { data, error } = await query;

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch donation details. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setDonation(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDonation();
  }, [donationId, email, toast]);

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    if (!donation) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('donations')
        .update({
          transaction_id: values.transaction_id,
          status: 'completed'
        })
        .eq('id', donation.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update transaction ID. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setShowSuccessDialog(true);

      // Navigate after dialog closes
      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const paymentDetails = {
    accountName: "WePlus Foundation",
    accountNumber: "1234567890",
    ifscCode: "SBIN0123456",
    bankName: "State Bank of India",
    upiId: "weplus@upi",
    qrCode: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=500",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} has been copied to clipboard`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-black">Payment Details</h1>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-black">Payment Details</h1>
        <div className="text-center text-gray-500">
          No donation details found. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Payment Details</h1>

      <div className="mx-auto max-w-3xl space-y-8">
        {/* Success Dialog */}
        <PaymentSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          amount={donation.amount}
        />

        {/* Donation Summary */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-6 text-2xl font-bold">Donation Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-bold">₹{donation.amount}</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-bold capitalize">{donation.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col items-center gap-4">
            <QrCode className="h-16 w-16 text-pink-500" />
            <h2 className="text-2xl font-bold">Scan QR Code</h2>
            <img
              src={paymentDetails.qrCode}
              alt="Payment QR Code"
              className="h-64 w-64 border-4 border-black object-cover"
            />
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-6 text-2xl font-bold">Bank Account Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-bold">{paymentDetails.accountName}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(paymentDetails.accountName, "Account name")}
                className="border-2 border-black hover:bg-yellow-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-bold">{paymentDetails.accountNumber}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(paymentDetails.accountNumber, "Account number")}
                className="border-2 border-black hover:bg-yellow-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">IFSC Code</p>
                <p className="font-bold">{paymentDetails.ifscCode}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(paymentDetails.ifscCode, "IFSC code")}
                className="border-2 border-black hover:bg-yellow-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-bold">{paymentDetails.bankName}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(paymentDetails.bankName, "Bank name")}
                className="border-2 border-black hover:bg-yellow-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* UPI Section */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-6 text-2xl font-bold">UPI Payment</h2>
          <div className="flex items-center justify-between rounded-lg border-2 border-black bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-600">UPI ID</p>
              <p className="font-bold">{paymentDetails.upiId}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(paymentDetails.upiId, "UPI ID")}
              className="border-2 border-black hover:bg-yellow-300"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Transaction ID Form */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-6 text-2xl font-bold">Confirm Your Payment</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="transaction_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your transaction ID"
                        className="border-2 border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={submitting}
                className="w-full border-2 border-black bg-green-500 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
              >
                {submitting ? "Confirming..." : "Confirm Payment"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}