import { Button } from "@/components/ui/button";
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentDetails() {
  const { toast } = useToast();

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Payment Details</h1>

      <div className="mx-auto max-w-3xl space-y-8">
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

        <Button
          onClick={() => window.history.back()}
          className="w-full border-2 border-black bg-pink-500 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
        >
          <IndianRupee className="mr-2" /> Back to Donation Form
        </Button>
      </div>
    </div>
  );
}