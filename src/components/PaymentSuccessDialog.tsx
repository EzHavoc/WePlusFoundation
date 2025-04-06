import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
}

export default function PaymentSuccessDialog({
  open,
  onOpenChange,
  amount,
}: PaymentSuccessDialogProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-black bg-white p-6 sm:p-8 sm:max-w-md rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black">
            Payment Successful!
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-gray-700">
            Thank you for your generous donation of ₹{amount}. <br className="hidden sm:block" />
            Your support makes a difference!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
