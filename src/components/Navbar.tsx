import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-4 border-black bg-yellow-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black">
          <Heart className="h-8 w-8" />
          WePlus Foundation
        </Link>
        <div className="flex gap-6">
          {[
            ['Home', '/'],
            ['Events', '/events'],
            ['Gallery', '/gallery'],
            ['Testimonials', '/testimonials'],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-lg font-bold hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}