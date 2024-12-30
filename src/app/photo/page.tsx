import ImageCard from "@/components/ImageCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Photo',
}

export default function PhotoPage() {
  const images = [
    "/photo/093A3055.jpg",
    "/photo/093A3177.jpg",

    "/photo/IMG_6741.JPG",
    "/photo/093A3663.jpg",

    "/photo/093A3519.jpg",

    "/photo/IMG_6738.jpg",
    "/photo/093A4182.jpg",
  ];
  return (
    <div className="container mt-16 mb-8 mx-auto px-8 xl:px-28 items-center" >
      <h1 className="text-4xl font-bold mb-10">Photo</h1>
      <div className=" sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-4 md:gap-4 fadeIn1">
        {images.map((image, index) => (
          <ImageCard key={index} url={image} />
        ))}
      </div>
    </div>
  );
}
