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
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

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
        <h1 className="mb-8 text-4xl font-black">Voices of Impact</h1>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Voices of Impact</h1>
      {testimonials.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <Quote className="h-12 w-12 text-pink-500" />
              <p className="mt-4 text-lg">{testimonial.quote}</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full border-4 border-black object-cover"
                />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No testimonials available.
        </div>
      )}
    </div>
  );
}