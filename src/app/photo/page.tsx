import { PhotoGallery } from "@/components/PhotoGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo",
};

export default function PhotoPage() {
  return (
    <div className="container mt-16 mb-8 mx-auto px-8 xl:px-28 items-center">
      <h1 className="text-4xl font-bold mb-10 !text-stone-300">Photo</h1>
      <PhotoGallery />
    </div>
  );
}
