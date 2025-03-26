import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-pink-300 p-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-2xl font-black">
            <Heart className="h-6 w-6" />
            WePlus Foundation
          </div>
          <p className="mt-2">Making the world a better place, one act at a time.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Contact Us</h3>
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              contact@weplusfoundation.org
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              123 Hope Street, Charity City
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Follow Us</h3>
          <div className="mt-4 flex gap-4">
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="border-2 border-black bg-white px-3 py-1 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}