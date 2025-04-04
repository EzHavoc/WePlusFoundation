import { Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", hoverColor: "group-hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", hoverColor: "group-hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", hoverColor: "group-hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", hoverColor: "group-hover:text-blue-700" },
  ];

  return (
    <footer className="border-t-4 border-black bg-pink-300 py-10">
      <div className="container mx-auto grid gap-12 px-4 md:grid-cols-3">
        
        {/* About Section */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2 text-2xl font-black">
            <Heart className="h-6 w-6" />
            <span>WePlus Foundation</span>
          </div>
          <p className="mt-2 text-gray-800">
            Making the world a better place, one act at a time.
          </p>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <div className="mt-4 space-y-2 text-gray-800">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="h-5 w-5" />
              contact@weplusfoundation.org
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="h-5 w-5" />
              +1 (555) 123-4567
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-5 w-5" />
              123 Hope Street, Charity City
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">Follow Us</h3>
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            {socialLinks.map(({ name, icon: Icon, href, hoverColor }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-full border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <Icon className={`h-6 w-6 text-black transition-colors duration-300 ${hoverColor}`} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-black pt-6 text-center text-gray-800">
        <p className="font-bold">&copy; {new Date().getFullYear()} WePlus Foundation. All rights reserved.</p>
        <p>Committed to making a difference through community support.</p>
      </div>
    </footer>
  );
}
