import { createDeck } from "@/actions/actions";
import CreateDeckForm from "@/app/components/CreateDeckForm";
import Link from "next/link";
import { useActionState } from "react";

export default function Create() {
  // const user = await currentUser();
  // const author = user?.id;
  //const [state, formAction] = useActionState(createDeck, {});
  return (
    <>
      <div className="flex w-full mb-6">
        <Link href="/decks/" className="w-full">
          <div className="flex items-center">
            <div className="text-gray-200 text-lg hover:underline">Back</div>
          </div>
        </Link>
      </div>
      <h1 className="dark:text-white text-3xl lg:text-5xl font-bold">
        New Deck
      </h1>

      <div className="flex justify-center mt-12">
        <CreateDeckForm />
      </div>
    </>
  );
}
