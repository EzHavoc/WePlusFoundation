import { useEffect, useState } from "react";
import { type GalleryImage } from "@/types";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch gallery images. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        setImages(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <h1 className="mb-6 text-3xl sm:text-4xl font-black text-center">
          Our Impact in Pictures
        </h1>
        <div className="flex items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-black sm:h-32 sm:w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <h1 className="mb-6 text-3xl sm:text-4xl font-black text-center">
        Our Impact in Pictures
      </h1>
      {images.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.url}
              className="group relative border-2 sm:border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="h-52 sm:h-64 w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 sm:p-4 text-white">
                <p className="text-sm sm:text-base font-semibold">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-base sm:text-lg">
          No gallery images available.
        </div>
      )}
    </div>
  );
}
