import ImageCard from "@/components/ImageCard";

export default function PhotoPage() {
  const images = [
    "/personal-site/photo/093A3055.jpg",
    "/personal-site/photo/093A3177.jpg",

    "/personal-site/photo/IMG_6741.JPG",
    "/personal-site/photo/093A3663.jpg",

    "/personal-site/photo/093A3519.jpg",

    "/personal-site/photo/IMG_6738.jpg",
    "/personal-site/photo/093A4182.jpg",
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
