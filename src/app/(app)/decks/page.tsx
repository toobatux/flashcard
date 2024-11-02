import Link from "next/link";
import { fetchPublicDecks } from "@/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Greeting from "../../components/Greeting";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { ChevronRight } from "@mui/icons-material";
import Searchbar from "../../components/Searchbar";
import { Add } from "@mui/icons-material";
import DeckCard from "../../components/DeckCard";

export default async function Decks() {
  auth().protect();
  // const { userId }: { userId: string | null } = auth();
  const decks = await fetchPublicDecks();
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="flex w-full justify-between items-center pb-2">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">Decks</div>
        </div>
        {/* <Greeting /> */}
        {/* <div className="z-10 sticky top-16 w-full bg-neutral-900 flex-row lg:items-center lg:justify-between">
          <Searchbar />
        </div> */}
        {/* <div>Hello, {user?.emailAddresses[0].toString()}</div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {decks.map((deck) => (
            <div key={deck.id}>
              <DeckCard deck={deck} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
