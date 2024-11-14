import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="text-xl font-bold mt-12 text-center">Landing</div>
      <div className="flex w-full items-center justify-center mt-20">
        <Link
          href="/home"
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg shadow-lg"
        >
          Get started
        </Link>
      </div>
    </>
  );
}
