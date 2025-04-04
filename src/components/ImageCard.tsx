// @ts-nocheck
import React from "react";
import Image from "next/image";

const ImageCard = ({ url }) => {
  return (
    // <div className="flex mt-5 max-w-sm rounded overflow-hidden shadow-lg justify-center object-contain mx-auto">
    //   <Image
    //     className="object-cover rounded shadow-lg"
    //     src={url}
    //     alt="Leyla Romanova"
    //     width={520}
    //     height={700}
    //     priority
    //   />
    // </div>

    <img class="h-auto max-w-full rounded-lg" src={url} alt="Leyla Romanova" />
  );
};

export default ImageCard;
