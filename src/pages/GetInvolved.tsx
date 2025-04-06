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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Users, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters").trim(),
});

export default function GetInvolved() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSubmitted(false);
    try {
      const { error } = await supabase.from("volunteers").insert([values]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Your volunteer application has been submitted successfully!",
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const volunteerAreas = [
    {
      title: "Food Distribution",
      icon: Heart,
      description: "Help distribute food to those in need",
    },
    {
      title: "Education",
      icon: Users,
      description: "Support our educational programs",
    },
    {
      title: "Event Organization",
      icon: Calendar,
      description: "Help organize and manage our events",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-3xl sm:text-4xl font-black text-center">Get Involved</h1>

      {/* Volunteer Opportunities */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold text-center sm:text-left">
          Volunteer Opportunities
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerAreas.map((area) => (
            <div
              key={area.title}
              className="border-2 sm:border-4 border-black bg-white p-5 sm:p-6 shadow-md"
            >
              <area.icon className="h-10 w-10 sm:h-12 sm:w-12 text-pink-500" />
              <h3 className="mt-3 text-lg sm:text-xl font-bold">{area.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Registration Form */}
      <div className="mx-auto max-w-xl sm:max-w-2xl">
        <div className="border-2 sm:border-4 border-black bg-white p-6 sm:p-8 shadow-md">
          <h2 className="mb-6 text-xl sm:text-2xl font-bold text-center sm:text-left">
            Volunteer Registration
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
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
                      <Input type="email" {...field} className="border-2 border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} className="border-2 border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="border-2 border-black">
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food Distribution</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="events">Event Organization</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="border-2 border-black"
                        placeholder="Tell us about yourself"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-black bg-yellow-300 text-black hover:bg-yellow-400"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>

          {submitted && (
            <div className="mt-6 rounded-md border border-green-700 bg-green-100 p-4 text-green-800 text-sm sm:text-base">
              🎉 Thank you for signing up! We’ve received your application and will contact you soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
