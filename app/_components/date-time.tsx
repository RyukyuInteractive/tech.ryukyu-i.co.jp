import { format, parseISO } from "date-fns"

type Props = {
  text: string
}

export const DateTime = (props: Props) => {
  const date = new Date(props.text)

  return <time dateTime={props.text}>{format(date, "LLLL	d, yyyy")}</time>
}
