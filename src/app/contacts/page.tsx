import { TbMailFilled } from "react-icons/tb";

export default function ContactsPage() {
  return (
    <div className="contacts__layout before:bg-contain before:bg-right-top">
      <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-default)]">
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full w-full bg-black">
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
          </div>
        </div>

        <div className="container mt-16 mb-8 mx-auto px-8 xl:px-28">
          <div className="mb-8">
          <h1 className="text-4xl mb-8">Contacts</h1>
          <div >
            <h2 className="text-3xl">
              Leyla Romanova
            </h2>

            <div className="text-2xl">
            <TbMailFilled />
            </div>
          </div>
          </div>
          

          <hr className="w-2/3 mt-4 mb-4"/>
          <h1 className="text-4xl mb-8">Socials</h1>
          <div >
            <h2 className="text-3xl">
              Leyla Romanova
            </h2>
            
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
