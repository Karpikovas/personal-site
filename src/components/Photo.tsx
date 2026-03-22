import Image from "next/image";
import Link from "next/link";

export const Photo = () => {
  return (
    <section className="relative min-h-[58vh] md:min-h-[66vh] lg:min-h-[72vh] overflow-hidden hero-glow">
      <Image
        src="/cover-new.jpg"
        alt="Leyla Romanova portrait"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[45%_55%] scale-[1.02]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(59,130,246,0.2),transparent_44%),radial-gradient(circle_at_18%_82%,rgba(148,163,184,0.14),transparent_42%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      <div className="absolute inset-0 z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14 xl:px-20 pb-6 md:pb-10 lg:pb-12 flex items-end justify-start">
        <div className="hero-enter hero-stagger max-w-3xl text-left">
          <p className="font-display uppercase tracking-[0.2em] text-[11px] md:text-xs !text-stone-300/80">
            Composer • Musical Artist
          </p>
          <h1 className="font-display mt-3 text-4xl md:text-6xl lg:text-7xl leading-[0.94] !text-stone-100 tracking-tight">
            Leyla Romanova
          </h1>
          <p className="mt-4 text-sm md:text-lg max-w-2xl !text-stone-300/90">
            Cinematic orchestral works and contemporary electronic soundscapes with a distinct dramatic voice.
          </p>
          <Link
            href="#releases"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-500/50 bg-stone-900/55 px-4 py-2 text-xs md:text-sm uppercase tracking-[0.14em] !text-stone-100 hover:bg-stone-800/70 transition-colors duration-300"
          >
            Explore Releases
          </Link>
        </div>
      </div>
    </section>
  );
};
