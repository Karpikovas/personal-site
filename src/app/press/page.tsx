import { getPress } from "@/constants/data";
import { PressList } from "@/components/PressList";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Press",
};

export default function PressPage() {
  const press = getPress();

  return (
    <Suspense fallback={<div className="container mt-16 mb-8 px-8 md:px-16 xl:px-48" />}>
      <PressList press={press} />
    </Suspense>
  );
}
