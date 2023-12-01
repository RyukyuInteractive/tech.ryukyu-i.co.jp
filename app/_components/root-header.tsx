import { BrandImageIcon } from "@/app/_components/brand-image-icon"
import { ThemeDropdownMenu } from "@/app/_components/theme-dropdown-menu"
import { config } from "@/config"
import Link from "next/link"

export const RootHeader = () => {
  return (
    <header className="px-4 py-4 max-w-screen-md mx-auto flex space-x-4 justify-between">
      <div className="flex space-x-4 items-center">
        <BrandImageIcon />
        <h1 className="text-xl font-bold">
          <Link href="/">{config.blogTitle}</Link>
        </h1>
      </div>
      <ThemeDropdownMenu />
    </header>
  )
}
