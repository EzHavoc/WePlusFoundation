import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { type Testimonial } from "@/types";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch testimonials. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        setTestimonials(data);
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

    fetchTestimonials();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl sm:text-4xl font-black text-center">Voices of Impact</h1>
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 sm:h-24 sm:w-24 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl sm:text-4xl font-black text-center">Voices of Impact</h1>

      {testimonials.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="border-4 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />
              <p className="mt-4 text-base sm:text-lg text-gray-800">{testimonial.quote}</p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-black object-cover"
                />
                <div className="text-center sm:text-left">
                  <p className="text-base sm:text-lg font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No testimonials available.</div>
      )}
    </div>
  );
}
