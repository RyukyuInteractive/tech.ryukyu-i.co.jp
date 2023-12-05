import { BrandLogo } from "@/app/_components/brand-logo"
import { ThemeDropdownMenu } from "@/app/_components/theme-dropdown-menu"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export const RootHeader = () => {
  return (
    <header className="sticky top-0 z-40">
      <Card className="max-w-screen-md mx-auto border-none rounded-none shadow-none">
        <div className="px-4 py-5 flex space-x-4 justify-between">
          <div className="flex space-x-4 items-center">
            <Link href="/">
              <h1 className="text-xl font-bold flex gap-x-4 items-baseline">
                <div className="dark:fill-white">
                  <BrandLogo />
                </div>
                <span>{"Tech Blog"}</span>
              </h1>
            </Link>
          </div>
          <ThemeDropdownMenu />
        </div>
      </Card>
    </header>
  )
}
