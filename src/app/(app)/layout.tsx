import SideNav from "../components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:pl-[5rem] xl:pl-[5rem] 2xl:pr-[5rem]">
        {/* Sidebar: Fixed on the left */}
        <SideNav isOpenMobile={false} />
        {/* Main Content: Scrollable */}
        <main className="w-full max-w-5xl mx-auto p-4">{children}</main>
      </div>
    </>
  );
}
