import { useEffect, useState } from "react";
import { type Event } from "@/types";
import { EventCarousel } from "@/components/EventCarousel";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch events. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        setEvents(data);
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

    fetchEvents();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container mx-auto flex-grow px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="mb-8 sm:mb-10 text-center text-3xl sm:text-5xl font-extrabold text-gray-900">
          Upcoming Events
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-gray-900" />
          </div>
        ) : events.length > 0 ? (
          <div className="mx-auto w-full max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-7xl h-[400px] sm:h-[500px] md:h-[600px]">
            <EventCarousel events={events} />
          </div>
        ) : (
          <div className="text-center text-base sm:text-xl text-gray-500">
            No upcoming events at the moment.
          </div>
        )}
      </main>
    </div>
  );
}
