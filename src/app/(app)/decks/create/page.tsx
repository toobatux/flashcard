import { createDeck } from "@/actions/actions";
import CreateDeckForm from "@/app/components/CreateDeckForm";
import { Close } from "@mui/icons-material";
import Link from "next/link";
import { useActionState } from "react";

export default function Create() {
  // const user = await currentUser();
  // const author = user?.id;
  //const [state, formAction] = useActionState(createDeck, {});
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="lg:my-6"></div>
        <div className="flex w-full justify-between items-center">
          <h1 className="dark:text-white text-xl md:text-2xl lg:text-3xl font-bold">
            New Deck
          </h1>
          {/* <Link
            href="/decks"
            className="flex items-center p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Close />
          </Link> */}
        </div>

        <div className="flex justify-center mt-4">
          <CreateDeckForm />
        </div>
      </div>
    </>
  );
}
