"use client"

import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

type HilightProps = {
  textNode: {
    value: string
  }
  language: string
}

export const HilightText = (props: HilightProps) => {
  const [style, setStyle] = useState({})

  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/dracula").then(
      (mod) => setStyle(mod.default),
    )
  }, [])
  return (
    <SyntaxHighlighter
      className="my-2 shadow"
      language={props.language}
      style={style}
    >
      {props.textNode.value}
    </SyntaxHighlighter>
  )
}
