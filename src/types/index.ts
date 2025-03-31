export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
}

export interface Program {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
}