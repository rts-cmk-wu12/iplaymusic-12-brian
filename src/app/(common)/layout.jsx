import CommonHeader from "@/components/ui/common-header";
import AppNavigationBar from "@/components/ui/app-navigation-bar";

export default function CommonLayout({ children }) {
  return (
    <>
      <div className="p-6">
        <CommonHeader />
        <main>
          {children}
        </main>
      </div>
      <AppNavigationBar />
    </>
  );
}
