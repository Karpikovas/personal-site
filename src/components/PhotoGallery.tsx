"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { renderNextImage } from "./NextImage";
import NextJsImage from "./NextJsImage";
import { photos } from "./photos";

function nextImageUrl(src: string, size: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}


export function PhotoGallery() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        render={{ image: renderNextImage }}
        defaultContainerWidth={1200}
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
        rowConstraints={{ maxPhotos: 3 }}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        plugins={[Captions]}
        index={index}
        slides={photos}
        open={index >= 0}
        render={{ slide: NextJsImage }}
        close={() => setIndex(-1)}
      />
    </>
  );
}
