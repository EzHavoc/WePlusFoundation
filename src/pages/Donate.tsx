import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(1, "Please enter a valid amount"),
  pan: z.string().length(10, "PAN number must be exactly 10 characters").regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
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
      const { error } = await supabase.from("donations").insert({
        name: values.name,
        email: values.email,
        amount: values.amount,
        pan: values.pan.toUpperCase(),
        status: "pending",
      });

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
        description: "Donation submitted successfully!",
      });

      form.reset();
      setTimeout(() => navigate("/payment-details"), 500);
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Make a Donation</h1>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div className="border-4 border-black bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold">Why Donate?</h2>
            <p className="mt-4">
              Your contribution helps us continue our mission of supporting those in need. Every donation makes a difference in someone's life.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold">Tax Benefits</h2>
            <p className="mt-4">
              All donations are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive a tax receipt via email.
            </p>
          </div>
        </div>

        <div className="border-4 border-black bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Donation Form</h2>

          <div className="mb-8">
            <h3 className="mb-4 font-bold">Suggested Amounts</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {suggestedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => form.setValue("amount", amount, { shouldValidate: true })}
                  className="border-2 border-black bg-white font-bold shadow-md hover:shadow-none"
                >
                  <IndianRupee className="mr-2 h-4 w-4" />
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input {...field} type="email" className="border-2 border-black" />
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
                {loading ? "Processing..." : <><IndianRupee className="mr-2" /> Proceed to Payment</>}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
