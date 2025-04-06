import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Copy, QrCode } from "lucide-react";
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
  const donationId = searchParams.get("donation_id");
  const email = searchParams.get("email");

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
        const { data, error } = await supabase
          .from("donations")
          .select("*")
          .eq("id", donationId)
          .eq("email", email)
          .single();

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
        .from("donations")
        .update({
          transaction_id: values.transaction_id,
          status: "completed",
        })
        .eq("id", donation.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update transaction ID. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setShowSuccessDialog(true);
      setTimeout(() => navigate("/"), 3500);
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
        <h1 className="mb-8 text-3xl sm:text-4xl font-black">Payment Details</h1>
        <div className="flex items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl sm:text-4xl font-black">Payment Details</h1>
        <div className="text-center text-gray-500">No donation details found. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="mb-8 text-3xl sm:text-4xl font-black">Payment Details</h1>

      <div className="mx-auto max-w-3xl space-y-8">
        <PaymentSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          amount={donation.amount}
        />

        {/* Donation Summary */}
        <div className="border-4 border-black bg-white p-4 sm:p-8 shadow-md sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Donation Summary</h2>
          <div className="space-y-4">
            {[
              { label: "Amount", value: `₹${donation.amount}` },
              { label: "Status", value: donation.status },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border-2 border-black bg-gray-50 p-4"
              >
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-bold text-lg capitalize">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <div className="border-4 border-black bg-white p-4 sm:p-8 shadow-md sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <QrCode className="h-12 w-12 sm:h-16 sm:w-16 text-pink-500" />
            <h2 className="text-xl sm:text-2xl font-bold">Scan QR Code</h2>
            <img
              src={paymentDetails.qrCode}
              alt="Payment QR Code"
              className="h-52 w-52 sm:h-64 sm:w-64 border-4 border-black object-cover"
            />
          </div>
        </div>

        {/* Bank Details */}
        <div className="border-4 border-black bg-white p-4 sm:p-8 shadow-md sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Bank Account Details</h2>
          <div className="space-y-4">
            {[
              { label: "Account Name", value: paymentDetails.accountName },
              { label: "Account Number", value: paymentDetails.accountNumber },
              { label: "IFSC Code", value: paymentDetails.ifscCode },
              { label: "Bank Name", value: paymentDetails.bankName },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border-2 border-black bg-gray-50 p-4"
              >
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(item.value, item.label)}
                  className="border-2 border-black hover:bg-yellow-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* UPI */}
        <div className="border-4 border-black bg-white p-4 sm:p-8 shadow-md sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">UPI Payment</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border-2 border-black bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-600">UPI ID</p>
              <p className="font-bold text-lg">{paymentDetails.upiId}</p>
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

        {/* Confirm Payment */}
        <div className="border-4 border-black bg-white p-4 sm:p-8 shadow-md sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Confirm Your Payment</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
                name="transaction_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base sm:text-lg">Transaction ID</FormLabel>
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
