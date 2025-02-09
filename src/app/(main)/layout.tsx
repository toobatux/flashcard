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
        <div className="flex-1 w-full h-full">
          <Navbar />
          <main className="w-full max-w-5xl mx-auto p-6 md:p-8 transition-transform pb-20">
            {children}
            {/* <Footer /> */}
          </main>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
