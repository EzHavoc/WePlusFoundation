import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Events() {
  const events = [
    {
      title: 'Annual Charity Gala',
      date: '2024-06-15',
      time: '18:00',
      location: 'Grand Hotel',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800',
      description:
        'Join us for our biggest fundraising event of the year. Evening of dinner, music, and making a difference.',
    },
    {
      title: 'Community Food Drive',
      date: '2024-07-01',
      time: '09:00',
      location: 'City Park',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800',
      description:
        'Help us collect and distribute food to families in need. Every donation makes a difference.',
    },
    {
      title: "Children's Education Workshop",
      date: '2024-07-15',
      time: '10:00',
      location: 'Community Center',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800',
      description:
        'Free workshop providing educational support and resources for underprivileged children.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Upcoming Events</h1>
      <div className="grid gap-8">
        {events.map((event) => (
          <div
            key={event.title}
            className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
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
        ))}
      </div>
    </div>
  );
}