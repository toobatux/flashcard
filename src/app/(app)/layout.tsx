import SideNav from "../components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:pl-[5rem] lg:pl-[15rem] 2xl:pr-[15rem]">
        {/* Sidebar: Fixed on the left */}
        <SideNav />
        {/* Main Content: Scrollable */}
        <main className="w-full max-w-5xl mx-auto p-4">{children}</main>
      </div>
    </>
  );
}
