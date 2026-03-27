import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/constants/basePath";

export const Photo = () => {
  return (
    <section className="relative min-h-[58vh] md:min-h-[66vh] lg:min-h-[72vh] overflow-hidden hero-glow">
      <Image
        src={withBasePath("/cover-new.jpg")}
        alt="Leyla Romanova portrait"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[34%_55%] sm:object-[42%_55%] md:object-[45%_55%] scale-[1.02]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(59,130,246,0.2),transparent_44%),radial-gradient(circle_at_18%_82%,rgba(148,163,184,0.14),transparent_42%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      <div className="absolute inset-0 z-10 flex items-end">
        <div className="container mx-auto w-full px-8 lg:px-20 pb-6 md:pb-10 lg:pb-12">
          <div className="hero-enter hero-stagger max-w-[17rem] sm:max-w-2xl md:max-w-3xl text-left">
            <p className="font-display uppercase tracking-[0.2em] text-[11px] md:text-xs !text-stone-300/80">
              <span className="whitespace-nowrap">Multi-genre Composer</span>
            </p>
            <h1 className="font-display mt-3 text-[1.3rem] sm:text-3xl md:text-4xl lg:text-5xl leading-[0.96] !text-stone-100 tracking-tight uppercase">
              Leyla Romanova
            </h1>
            <p className="mt-4 text-sm md:text-lg max-w-[17rem] sm:max-w-[30rem] md:max-w-2xl !text-stone-300/90 text-balance">
              crafting cinematic music: from <span className="whitespace-nowrap">symphonic grandeur</span> to{" "}
              <span className="whitespace-nowrap">cutting-edge</span> electronic soundscapes.
            </p>
            <Link
              href="#releases"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-500/50 bg-stone-900/55 px-4 py-2 text-xs md:text-sm uppercase tracking-[0.14em] !text-stone-100 hover:bg-stone-800/70 transition-colors duration-300"
            >
              Explore Releases
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
