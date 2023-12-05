import Link from "next/link"

export const RootFooter = () => {
  return (
    <footer className="max-w-screen-md mx-auto px-4 py-16">
      <Link href={"https://inta.co.jp"}>
        <h3 className="text-center font-bold">{"© 2016 Interactive"}</h3>
      </Link>
    </footer>
  )
}
