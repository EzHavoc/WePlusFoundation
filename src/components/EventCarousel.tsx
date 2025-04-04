
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Event } from "@/types";

interface EventCarouselProps {
  events: Event[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.title}>
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="grid md:grid-cols-2">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-64 border-b-4 border-black object-cover md:border-b-0 md:border-r-4"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{event.title}</h2>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {event.location}
                    </p>
                  </div>
                  <Button className="mt-4 border-2 border-black bg-yellow-300 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-2 border-black" />
      <CarouselNext className="border-2 border-black" />
    </Carousel>
  );
}