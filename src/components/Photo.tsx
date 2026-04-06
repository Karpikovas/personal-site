import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/constants/basePath";

export const Photo = () => {
  return (
    <section className="relative h-[calc(100svh-72px)] min-h-[calc(100svh-72px)] overflow-hidden hero-glow md:h-[calc(100dvh-92px)] md:min-h-[calc(100dvh-92px)]">
      <Image
        src={withBasePath("/cover-new.jpg")}
        alt="Leyla Romanova portrait"
        fill
        priority
        quality={100}
        sizes="(max-width: 767px) 520vw, 180vw"
        className="hero-image-intro object-cover object-[48%_54%] sm:object-[44%_55%] md:object-[45%_55%]"
      />

      <div className="hero-filter-intro absolute inset-0 bg-[radial-gradient(circle_at_80%_22%,rgba(59,130,246,0.42),transparent_48%),radial-gradient(circle_at_18%_82%,rgba(148,163,184,0.11),transparent_44%)]" />
      <div className="hero-gradient-intro absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_5%,rgba(0,0,0,0.9)_15%,rgba(0,0,0,0.62)_37%,rgba(0,0,0,0.2)_65%,rgba(0,0,0,0.05)_100%)]" />
      <div className="hero-text-contrast-intro absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.86)_23%,rgba(0,0,0,0.42)_41%,rgba(0,0,0,0)_63%)]" />

      <div className="absolute inset-0 z-10 flex items-end">
        <div className="container mx-auto w-full px-8 lg:px-20 pb-[max(env(safe-area-inset-bottom),4.1rem)] md:pb-[5.5rem] lg:pb-[6.5rem]">
          <div className="hero-copy-delayed hero-enter hero-stagger max-w-[17rem] sm:max-w-2xl md:max-w-3xl text-left">
            <p className="font-display uppercase tracking-[0.2em] text-[11px] md:text-xs lg:text-sm 2xl:text-lg !text-stone-300/80">
              <span className="whitespace-nowrap">Multi-genre Composer</span>
            </p>
            <h1 className="font-display mt-3 text-[1.3rem] sm:text-3xl md:text-4xl lg:text-5xl leading-[0.96] !text-stone-100 tracking-tight uppercase">
              Leyla Romanova
            </h1>
            <p className="mt-4 text-sm md:text-lg lg:text-xl max-w-[17rem] sm:max-w-[30rem] md:max-w-2xl 2xl:max-w-[42rem] !text-stone-300/90 text-balance">
              crafting cinematic music: from <span className="whitespace-nowrap">symphonic grandeur</span> to{" "}
              <span className="whitespace-nowrap">cutting-edge</span> electronic soundscapes.
            </p>
            <Link
              href="#releases"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-500/50 bg-stone-900/55 px-4 py-2 text-xs md:text-sm lg:text-lg uppercase tracking-[0.14em] !text-stone-100 hover:bg-stone-800/70 transition-colors duration-300"
            >
              Explore Releases
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
