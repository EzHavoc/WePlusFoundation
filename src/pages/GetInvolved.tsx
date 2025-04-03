import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  interest: z.string({ required_error: "Please select an area of interest" }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function GetInvolved() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchVolunteers() {
      const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch Error:", error);
      } else {
        setVolunteers(data);
      }
    }
    fetchVolunteers();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      console.log("Submitting:", values);

      // Insert into Supabase without authentication
      const { data, error } = await supabase
        .from("volunteers")
        .insert([values])
        .select("*");

      console.log("Supabase Response:", { data, error });

      if (error) {
        throw error;
      }

      setVolunteers((prev) => [data[0], ...prev]);

      toast({
        title: "Success",
        description: "Your volunteer application has been submitted successfully!",
      });

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
    { title: "Food Distribution", icon: Heart, description: "Help distribute food to those in need" },
    { title: "Education", icon: Users, description: "Support our educational programs" },
    { title: "Event Organization", icon: Calendar, description: "Help organize and manage our events" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Get Involved</h1>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Volunteer Opportunities</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {volunteerAreas.map((area) => (
            <div key={area.title} className="border-4 border-black bg-white p-6 shadow-md">
              <area.icon className="h-12 w-12 text-pink-500" />
              <h3 className="mt-4 text-xl font-bold">{area.title}</h3>
              <p className="mt-2 text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 border-4 border-black bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Volunteer Registration</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input {...field} className="border-2 border-black" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input {...field} type="email" className="border-2 border-black" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input {...field} type="tel" className="border-2 border-black" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="interest" render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="border-2 border-black" placeholder="Tell us about yourself" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={loading} className="w-full border-2 border-black bg-yellow-300">
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
