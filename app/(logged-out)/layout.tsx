import { LightDarkToggle } from "@/components/ui/light-dark-toggle"

type Props = {
  children: React.ReactNode
}

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-4 md:p-24">{children}</div>
      <LightDarkToggle className="fixed right-4 top-4 md:right-0 md:top-1/2" />
    </>
  )
}
