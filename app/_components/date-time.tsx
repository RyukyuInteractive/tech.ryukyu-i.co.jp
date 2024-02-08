import { format } from "date-fns"
import { ja } from "date-fns/locale"

type Props = {
  text: string
}

export const DateTime = (props: Props) => {
  const date = new Date(props.text)

  return (
    <time dateTime={props.text}>
      {format(date, "yyyy年MM月dd日(E)", { locale: ja })}
    </time>
  )
}
