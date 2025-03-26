import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Beneficiary',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
      quote:
        'WePlus Foundation helped my family during our toughest times. Their support made all the difference in our lives.',
    },
    {
      name: 'Michael Chen',
      role: 'Volunteer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150',
      quote:
        "Volunteering with WePlus has been incredibly rewarding. Seeing the direct impact we make in people's lives is priceless.",
    },
    {
      name: 'Emily Rodriguez',
      role: 'Donor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
      quote:
        'I trust WePlus Foundation completely. Their transparency and dedication to helping others is truly inspiring.',
    },
    {
      name: 'David Thompson',
      role: 'Community Partner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
      quote:
        'Working with WePlus has amplified our impact in the community. Their organization and commitment are outstanding.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Voices of Impact</h1>
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
    </div>
  );
}