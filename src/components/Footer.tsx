import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      hoverColor: "group-hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      hoverColor: "group-hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      hoverColor: "group-hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      hoverColor: "group-hover:text-blue-700",
    },
  ];

  return (
    <footer className="bg-pink-300 border-t-4 border-black px-4 py-6 text-gray-800 text-sm">
      {/* Main Grid */}
      <div className="max-w-screen-sm sm:max-w-4xl mx-auto grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* About */}
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:justify-start items-center gap-2 text-xl font-black">
            <Heart className="h-5 w-5" />
            <span>WePlus Foundation</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm">
            Making the world a better place, one act at a time.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="h-4 w-4" />
              contact@weplusfoundation.org
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="h-4 w-4" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="h-4 w-4" />
              123 Hope Street, Charity City
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
            {socialLinks.map(({ name, icon: Icon, href, hoverColor }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group flex items-center justify-center p-2 border-2 border-black bg-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <Icon
                  className={`h-5 w-5 text-black transition-colors duration-300 ${hoverColor}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-black pt-4 text-center text-xs sm:text-sm">
        <p className="font-bold">
          &copy; {new Date().getFullYear()} WePlus Foundation. All rights reserved.
        </p>
        <p className="mt-1">
          Committed to making a difference through community support.
        </p>
      </div>
    </footer>
  );
}
