import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

type Props = {
  children: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      {/* Container: center contents vertically/horizontally and adjust spacing responsively */}
      <div className="flex flex-col gap-2 sm:gap-4 min-h-screen items-center justify-center p-4 sm:p-8 lg:p-24">
        {children}
      </div>

      {/* Theme toggle – desktop */}
      <LightDarkToggle className="hidden md:block fixed right-0 top-1/2" />

      {/* Theme toggle – mobile */}
      <LightDarkToggle className="block md:hidden fixed bottom-4 right-4" />
    </>
  );
}
