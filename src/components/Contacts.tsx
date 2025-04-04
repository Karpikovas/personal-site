import Link from "next/link";
import { Social } from "./Social";

export const Contacts = () => {
  return (
    <footer className="flex flex-col items-center justify-between py-8 gap-4">
      <Link href="mailto:contact@leylaromanova.com" className="text-md !text-stone-300">contact@leylaromanova.com</Link>
      <div className="flex items-center justify-center gap-4 text-2xl !text-stone-300">
        <Social />
      </div>
    </footer>
  );
};
