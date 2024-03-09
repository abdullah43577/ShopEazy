import Filters from "@/components/MainComponent/Filters";
import Products from "@/components/MainComponent/Products";

export default function Home() {
  return (
    <main>
      <div className="mx-auto flex max-w-[1440px] items-start gap-4 px-8 md:px-4">
        <Filters />
        <Products />
      </div>
    </main>
  );
}
