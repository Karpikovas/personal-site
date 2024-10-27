import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export const Hero = () => {
  return (
    <div className="pb-4 lg:mb-36">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:pr-8">
          <div className="flex">      
            <Image
              className="border border-stone-900 rounded-xl"
              src="/personal-site/leyla.jpeg"
              alt="Leyla Romanova"
              width={650}
              height={975}
              priority
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start mt-10">
            <h2 className="pb-2 text-3xl tracking-tight lg:text-7xl font-semibold text-wrap">
              Leyla <br className="hidden lg:inline-block" />
              Romanova
            </h2>
            <h3 className="pb-2 text-xl tracking-tight lg:text-4xl font-medium">
              (born 14 September 1989)
            </h3>

            <h3 className="mt-5 lg:mt-10 pb-2 text-xl tracking-tight lg:text-4xl font-medium">
              has two different career tracks:
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:pr-8">
          <div className="flex flex-col lg:items-start mt-10">
            <h4 className="pb-2 text-xl tracking-tight lg:text-2xl font-bold text-wrap">
              1. Financier & Tech startup consultant
            </h4>
            <h5 className="pb-3 text-l tracking-tight lg:text-2xl text-stone-300 font-medium">
              Education: University of Warwick, UK (MSc Economics), MGIMO,
              Russia (BSc Commerce)
            </h5>
            <h5 className="pb-2 text-l tracking-tight lg:text-2xl text-stone-300 font-medium">
              Career: Director of projects (CPO) at one of the largest banks in
              CEE, former Moscow Chapter Director of the Founder Institute, US
              (pre-seed startup accelerator)
            </h5>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col lg:items-start mt-10">
            <h4 className="pb-2 text-xl tracking-tight lg:text-2xl font-bold text-wrap">
              2. Composer
            </h4>
            <h5 className="pb-3 text-l tracking-tight lg:text-2xl text-stone-300 font-medium">
              Education: Music school named after Bulbul, Azerbaijan
              (composition department)
            </h5>
            <h5 className="pb-3 text-l tracking-tight lg:text-2xl text-stone-300 font-medium">
              Career: Leyla creates music in different genres — her neo-
              classical musical works are performed by orches- tras in different
              countries, songs, sung by various singers are heard on radio
              stations.
            </h5>
            <h5 className="pb-3 text-l tracking-tight lg:text-2xl text-stone-300 font-medium">
              Plans: to create music for films, TV series and fashion shows.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
