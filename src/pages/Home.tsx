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
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black leading-snug sm:leading-tight">
              Together We Can Make
              <span className="block text-pink-500">A Difference</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-700">
              Join us in our mission to create positive change and support those in
              need through community action and compassion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="border-2 border-black bg-yellow-300 text-base sm:text-lg font-bold shadow-md hover:shadow-none w-full sm:w-auto">
                <Link to="/get-involved">
                  Get Involved <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button asChild className="border-2 border-black bg-pink-500 text-base sm:text-lg font-bold text-white shadow-md hover:shadow-none w-full sm:w-auto">
                <Link to="/donate">
                  Donate Now <IndianRupee className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800"
              alt="People working together for community support"
              className="border-4 border-black object-cover shadow-lg w-full max-h-[400px] sm:max-h-[500px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { number: "10K+", label: "Lives Touched", Icon: Heart },
            { number: "500+", label: "Volunteers", Icon: Users },
            { number: "200+", label: "Events Organized", Icon: Calendar },
          ].map(({ number, label, Icon }) => (
            <div
              key={label}
              className="border-4 border-black bg-white p-6 text-center shadow-lg transition-transform hover:translate-y-1 hover:shadow-none"
            >
              <Icon className="mx-auto h-10 w-10 text-pink-500 sm:h-12 sm:w-12" />
              <div className="mt-4 text-3xl sm:text-4xl font-black">{number}</div>
              <div className="mt-1 sm:mt-2 text-lg sm:text-xl font-bold text-gray-700">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl sm:text-3xl font-black">Our Programs</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group border-4 border-black bg-white shadow-lg transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <img
                src={program.image}
                alt={`Image representing ${program.title}`}
                className="h-40 sm:h-48 w-full border-b-4 border-black object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-bold">{program.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
