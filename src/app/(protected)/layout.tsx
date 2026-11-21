import Footer from "@/src/components/ui/layout/Footer";
import Navbar from "@/src/components/ui/layout/Navbar";
import Sidebar from "@/src/components/ui/layout/Sidebar/Sidebar";
import { Suspense } from "react";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <div className="flex flex-row w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
      
        <main className="flex-1 flex flex-col">
          <Navbar />
          <div className="mx-auto flex-1 xl:min-w-300 xl:max-w-400 w-full">
              {children}
          </div>
          <Footer />  
        </main>
      </div>
  );
}
