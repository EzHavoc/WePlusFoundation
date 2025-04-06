import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(1, "Please enter a valid amount"),
  pan: z
    .string()
    .length(10, "PAN number must be exactly 10 characters")
    .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
});

export default function Donate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", amount: 0, pan: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("donations")
        .insert({
          name: values.name,
          email: values.email,
          amount: values.amount,
          pan: values.pan.toUpperCase(),
          status: "pending",
        })
        .select("id")
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to submit donation. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Donation registered successfully! Please proceed to payment.",
      });

      form.reset();
      setTimeout(() => {
        navigate(
          `/payment-details?donation_id=${data.id}&email=${encodeURIComponent(
            values.email
          )}`
        );
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const suggestedAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="mb-6 sm:mb-8 text-3xl sm:text-4xl font-black text-center sm:text-left">
        Make a Donation
      </h1>

      <div className="mx-auto max-w-3xl space-y-6">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          <div className="border-4 border-black bg-white p-4 sm:p-6 shadow-md sm:shadow-lg rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold">Why Donate?</h2>
            <p className="mt-3 text-sm sm:text-base">
              Your contribution helps us continue our mission of supporting those in need. Every donation makes a difference.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-4 sm:p-6 shadow-md sm:shadow-lg rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold">Tax Benefits</h2>
            <p className="mt-3 text-sm sm:text-base">
              All donations are eligible for tax deduction under Section 80G. You’ll receive a receipt via email.
            </p>
          </div>
        </div>

        <div className="border-4 border-black bg-white p-5 sm:p-8 shadow-lg rounded-lg">
          <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold">
            Donation Form
          </h2>

          <div className="mb-6 sm:mb-8">
            <h3 className="mb-3 text-base sm:text-lg font-bold">
              Suggested Amounts
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {suggestedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() =>
                    form.setValue("amount", amount, { shouldValidate: true })
                  }
                  className="border-2 border-black bg-white font-bold shadow-sm hover:shadow-none"
                >
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-2 border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="border-2 border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="border-2 border-black"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-2 border-black uppercase"
                        placeholder="ABCDE1234F"
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-black bg-pink-500 font-bold text-white shadow-md hover:shadow-none"
              >
                {loading ? "Processing..." : (
                  <>
                    <IndianRupee className="mr-2" /> Proceed to Payment
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
