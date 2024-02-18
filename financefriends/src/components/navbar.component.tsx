import Navbarlink from "@/components/navbarlink.component";

export default function Navbar(){
  return(
    <nav className="flex justify-between px-4 py-8 font-medium text-white bg-black">
      <p className="text-3xl">Finance Friends: Explore Troy</p>
      <div className="flex justify-between w-1/3">
        <Navbarlink href="./instruction" text="Instructions"></Navbarlink>
        <Navbarlink href="./resources" text="Resources"></Navbarlink>
        <Navbarlink href="./about" text="About Us"></Navbarlink>
      </div>
    </nav>
  );
}