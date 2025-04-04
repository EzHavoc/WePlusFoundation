import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Calendar, IndianRupee } from "lucide-react";
import { type Program } from "@/types";
import { Link } from "react-router-dom";

export default function Home() {
  const programs: Program[] = [
    {
      title: "Food Bank",
      description: "Providing meals to families in need",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400",
    },
    {
      title: "Education Support",
      description: "Helping children access quality education",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400",
    },
    {
      title: "Healthcare Assistance",
      description: "Providing medical aid to those in need",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400",
    },
  ];

  return (
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl font-black leading-tight">
              Together We Can Make
              <span className="block text-pink-500">A Difference</span>
            </h1>
            <p className="text-xl text-gray-700">
              Join us in our mission to create positive change and support those in
              need through community action and compassion.
            </p>
            <div className="flex gap-4">
              <Button asChild className="border-2 border-black bg-yellow-300 text-lg font-bold shadow-md hover:shadow-none">
                <Link to="/get-involved">
                  Get Involved <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild className="border-2 border-black bg-pink-500 text-lg font-bold text-white shadow-md hover:shadow-none">
                <Link to="/donate">
                  Donate Now <IndianRupee className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800"
              alt="People working together for community support"
              className="border-4 border-black object-cover shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {[  
            { number: "10K+", label: "Lives Touched", Icon: Heart },
            { number: "500+", label: "Volunteers", Icon: Users },
            { number: "200+", label: "Events Organized", Icon: Calendar }
          ].map(({ number, label, Icon }) => (
            <div key={label} className="border-4 border-black bg-white p-6 text-center shadow-lg transition-transform hover:translate-y-1 hover:shadow-none">
              <Icon className="mx-auto h-12 w-12 text-pink-500" />
              <div className="mt-4 text-4xl font-black">{number}</div>
              <div className="mt-2 text-xl font-bold text-gray-700">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-black">Our Programs</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <div key={program.title} className="group border-4 border-black bg-white shadow-lg transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              <img
                src={program.image}
                alt={`Image representing ${program.title}`}
                className="h-48 w-full border-b-4 border-black object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{program.title}</h3>
                <p className="mt-2 text-gray-600">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}