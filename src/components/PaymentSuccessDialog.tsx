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

export default function PaymentSuccessDialog({ open, onOpenChange, amount }: PaymentSuccessDialogProps) {
  useEffect(() => {
    if (open) {
      // Automatically close after 3 seconds
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-black bg-white sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <DialogTitle className="text-center text-2xl font-black">
            Payment Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Thank you for your generous donation of ₹{amount}. Your support makes a difference!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}