import { type GalleryImage } from "@/types";

export default function Gallery() {
  const images: GalleryImage[] = [
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800",
      caption: "Community Food Drive",
    },
    {
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800",
      caption: "Education Support Program",
    },
    {
      url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800",
      caption: "Healthcare Initiative",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800",
      caption: "Annual Charity Gala",
    },
    {
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800",
      caption: "Youth Mentorship Program",
    },
    {
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800",
      caption: "Senior Care Services",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">Our Impact in Pictures</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[8px] hover:translate-y-[8px] hover:shadow-none"
          >
            <img
              src={image.url}
              alt={image.caption}
              className="h-64 w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 text-white">
              <p className="text-lg font-bold">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}