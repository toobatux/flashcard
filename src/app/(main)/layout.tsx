import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div className="md:pl-[5rem] xl:pl-0"> */}
      {/* Sidebar: Fixed on the left */}
      <div className="flex">
        <SideNav />
        {/* Main Content: Scrollable */}
        <div className="flex-auto w-full h-full">
          <Navbar />
          <div className="flex flex-col h-full">
            <main className="w-full h-full max-w-6xl p-6 mx-auto transition-transform pb-[70px] md:pb-[20px]">
              {children}
            </main>
          </div>
        </div>
        {/* <div className="flex-auto w-full h-screen md:pt-2 overflow-hidden nav-bg">
          <div className="flex flex-col h-full">
            <Navbar />

            <div className="flex-grow overflow-auto app-bg">
              <main className="w-full px-6 md:px-12 py-6 mx-auto transition-transform pb-[70px] md:pb-[20px]">
                {children}
              </main>
            </div>
          </div>
        </div> */}
      </div>
      {/* </div> */}
    </>
  );
}
