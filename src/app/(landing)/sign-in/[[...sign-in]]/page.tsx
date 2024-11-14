import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-full justify-center my-20">
      <SignIn afterSignOutUrl={"/"} />
    </div>
  );
}
