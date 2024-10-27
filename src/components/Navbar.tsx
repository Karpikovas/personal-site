import { Social } from "./Social";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-8">
      <div className="mr-8 flex items-center justify-center gap-4 text-4xl tracking-wide font-bold">
        LR
      </div>
      <div className="ml-8 flex items-center justify-center gap-4 text-2xl">
        <Social />
      </div>
    </nav>
  );
};
