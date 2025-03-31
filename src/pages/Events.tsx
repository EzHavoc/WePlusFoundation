import { type Event } from "@/types";
import { EventCarousel } from "@/components/EventCarousel";

export default function Events() {
  const events: Event[] = [
    {
      title: "Annual Charity Gala",
      date: "2024-06-15",
      time: "18:00",
      location: "Grand Hotel",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800",
      description:
        "Join us for our biggest fundraising event of the year. Evening of dinner, music, and making a difference.",
    },
    {
      title: "Community Food Drive",
      date: "2024-07-01",
      time: "09:00",
      location: "City Park",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800",
      description:
        "Help us collect and distribute food to families in need. Every donation makes a difference.",
    },
    {
      title: "Children's Education Workshop",
      date: "2024-07-15",
      time: "10:00",
      location: "Community Center",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800",
      description:
        "Free workshop providing educational support and resources for underprivileged children.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Upcoming Events</h1>
      <EventCarousel events={events} />
    </div>
  );
}