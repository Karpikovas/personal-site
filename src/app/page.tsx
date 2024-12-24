import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";

export default function Home() {
  return (
    <div className="fadeIn">
      <Photo />

      <div className="container mt-16 mb-8 mx-auto px-8 xl:px-24 fadeIn1">
        <Music />
      </div>
    </div>
  );
}
