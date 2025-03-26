import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Calendar, Image } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl font-black leading-tight">
              Together We Can Make
              <span className="block text-pink-500">A Difference</span>
            </h1>
            <p className="text-xl">
              Join us in our mission to create positive change and support those in
              need through community action and compassion.
            </p>
            <Button className="border-2 border-black bg-yellow-300 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              Get Involved <ArrowRight className="ml-2" />
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800"
              alt="Community support"
              className="border-4 border-black object-cover shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['10K+', 'Lives Touched', Heart],
            ['500+', 'Volunteers', Users],
            ['200+', 'Events Organized', Calendar],
          ].map(([number, label, Icon]) => (
            <div
              key={label}
              className="border-4 border-black bg-white p-6 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <Icon className="mx-auto h-12 w-12" />
              <div className="mt-4 text-4xl font-black">{number}</div>
              <div className="mt-2 text-xl font-bold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-black">Our Programs</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Food Bank',
              description: 'Providing meals to families in need',
              image:
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400',
            },
            {
              title: 'Education Support',
              description: 'Helping children access quality education',
              image:
                'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400',
            },
            {
              title: 'Healthcare Assistance',
              description: 'Providing medical aid to those in need',
              image:
                'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400',
            },
          ].map((program) => (
            <div
              key={program.title}
              className="group border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[8px] hover:translate-y-[8px] hover:shadow-none"
            >
              <img
                src={program.image}
                alt={program.title}
                className="h-48 w-full border-b-4 border-black object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{program.title}</h3>
                <p className="mt-2">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}