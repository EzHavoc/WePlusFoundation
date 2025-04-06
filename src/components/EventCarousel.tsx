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
  onRegisterClick?: (event: Event) => void; // optional callback
}

export function EventCarousel({ events, onRegisterClick }: EventCarouselProps) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto px-4">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={`${event.title}-${event.date}`} className="sm:basis-full">
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  src={event.image}
                  alt={event.title || "Event image"}
                  className="h-48 sm:h-64 w-full object-cover border-b-4 border-black md:border-b-0 md:border-r-4"
                />
                <div className="p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">{event.title}</h2>
                    <p className="mt-2 text-gray-600 text-sm sm:text-base">
                      {event.description}
                    </p>
                    <div className="mt-4 space-y-2 text-sm sm:text-base">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full sm:w-auto border-2 border-black bg-yellow-300 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
                    aria-label={`Register for ${event.title}`}
                    onClick={() => onRegisterClick?.(event)}
                  >
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
