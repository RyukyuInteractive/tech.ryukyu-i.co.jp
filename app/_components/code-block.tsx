"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import style from "react-syntax-highlighter/dist/esm/styles/prism/dracula"

type Props = {
  language: string
  children: string
}

/**
 * コードに色を付けるぜ
 * @param props
 * @returns
 */
export const CodeBlock = (props: Props) => {
  return (
    <SyntaxHighlighter
      className="my-2 shadow"
      language={props.language}
      style={style}
    >
      {props.children}
    </SyntaxHighlighter>
  )
}
