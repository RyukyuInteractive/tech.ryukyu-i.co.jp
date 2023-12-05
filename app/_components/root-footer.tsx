import Link from "next/link"

export const RootFooter = () => {
  return (
    <footer className="max-w-screen-md mx-auto px-4 py-16">
      <Link href={"https://inta.co.jp"} className="flex gap-x-4 items-center">
        <img
          alt="Interactive"
          src={"https://www.inta.co.jp/common/images/common/logo.svg"}
        />
      </Link>
    </footer>
  )
}
