import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { SearchBar } from "./search-bar";
export function Header() {
  return (
    <header className="w-full h-14 bg-white flex justify-start items-center gap-5">
      <div className="flex flex-row items-center gap-3">
        <Image src={Logo} alt="Logo" width={20} height={20} />
        <h1 className=" text-sm">CoreNotes</h1>
      </div>
      <SearchBar />
    </header>
  );
}
