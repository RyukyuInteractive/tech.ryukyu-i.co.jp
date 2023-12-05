import { BrandImageIcon } from "@/app/_components/brand-image-icon"
import { ThemeDropdownMenu } from "@/app/_components/theme-dropdown-menu"
import { Card } from "@/components/ui/card"
import { config } from "@/config"
import Link from "next/link"

export const RootHeader = () => {
  return (
    <header className="sticky top-0 z-40">
      <Card className="border-t-0 border-x-0 rounded-none">
        <div className="max-w-screen-md mx-auto px-4 py-4 flex space-x-4 justify-between">
          <div className="flex space-x-4 items-center">
            <BrandImageIcon />
            <h1 className="text-xl font-bold">
              <Link href="/">{config.blogTitle}</Link>
            </h1>
          </div>
          <ThemeDropdownMenu />
        </div>
      </Card>
    </header>
  )
}
