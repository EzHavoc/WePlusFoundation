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
          .from('events')
          .select('*')
          .order('date', { ascending: true });

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-black">Upcoming Events</h1>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Upcoming Events</h1>
      {events.length > 0 ? (
        <EventCarousel events={events} />
      ) : (
        <div className="text-center text-gray-500">
          No upcoming events at the moment.
        </div>
      )}
    </div>
  );
}