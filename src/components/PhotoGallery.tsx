"use client";

import { useState } from "react";
import {
  RowsPhotoAlbum,
} from "react-photo-album";
// import Lightbox from "yet-another-react-lightbox";
// import Captions from "yet-another-react-lightbox/plugins/captions";
import { renderNextImage } from "./NextImage";

const ELENA_KVITA = 'by Elena Kvita';
const ROMAN_AGISHEV = 'by Roman Agishev';
const BASE_HEIGHT = 4032;

const photos = [
  { src: "/photo/1.jpg", width: 7360, height: 4898, alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/2.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/3.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/4.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/5.jpg", width: 3269, height: 4912 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/6.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/7.jpg", width: 1595, height: 1918 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/9.jpg", width: 7360, height: 3978 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  // // { src: "/photo/8.jpg", width: 3267, height: 4912 , alt: 'Leyla Romanova' },
  { src: "/photo/13.jpg", width: 7360, height: 4897 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/10.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/11.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/12.jpg", width: 3268, height: 4912 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/14.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/15.jpg", width: 7360, height: 2810 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/16.jpg", width: 7360, height: 2654 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/19.jpg", width: 2683, height: BASE_HEIGHT , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/17.jpg", width: 7360, height: 2692 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/18.jpg", width: 7360, height: 3743 , alt: 'Leyla Romanova', description: ELENA_KVITA },
  { src: "/photo/20.jpg", width: 3024, height: BASE_HEIGHT , alt: 'Leyla Romanova' },
  { src: "/photo/21.jpg", width: 3024, height: BASE_HEIGHT , alt: 'Leyla Romanova' },
  { src: "/photo/22.jpg", width: 3024, height: BASE_HEIGHT , alt: 'Leyla Romanova' },
  { src: "/photo/23.jpg", width: 3024, height: BASE_HEIGHT , alt: 'Leyla Romanova' },
  { src: "/photo/24.jpg", width: 3024, height: BASE_HEIGHT , alt: 'Leyla Romanova' },
  { src: "/photo/26.jpg", width: 3684, height: 4912 , alt: 'Leyla Romanova' },
  { src: "/photo/27.jpg", width: 3684, height: 4912 , alt: 'Leyla Romanova' },
  { src: "/photo/28.jpg", width: 3423, height: 4792 , alt: 'Leyla Romanova', description: ROMAN_AGISHEV },
  { src: "/photo/29.jpg", width: 5464, height: 7650 , alt: 'Leyla Romanova', description: ROMAN_AGISHEV },
  { src: "/photo/30.jpg", width: 5199, height: 7350 , alt: 'Leyla Romanova', description: ROMAN_AGISHEV },
  { src: "/photo/31.jpg", width: 5464, height: 7650 , alt: 'Leyla Romanova', description: ROMAN_AGISHEV },
  { src: "/photo/32.jpg", width: 3276, height: 4912 , alt: 'Leyla Romanova', description: ROMAN_AGISHEV },
];

export function PhotoGallery() {
  const [index, setIndex] = useState(-1);

  return (
    <div>
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
        rowConstraints={{maxPhotos: 3}}
        onClick={({ index: current }) => setIndex(current)}
      />

      {/* <Lightbox
        plugins={[Captions]}
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
      /> */}
    </div>
  );
}
