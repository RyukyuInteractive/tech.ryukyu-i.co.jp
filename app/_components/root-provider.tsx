"use client"

import { config } from "@/config"
import { ThemeProvider } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

export const RootProvider = (props: Props) => {
  const pathname = usePathname()

  useEffect(() => {
    window.gtag("config", config.gtagId, {
      page_path: pathname,
    })
  }, [pathname])

  return (
    <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
      {props.children}
    </ThemeProvider>
  )
}
