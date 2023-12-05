import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DateTime } from "./date-time"

type Props = {
  title: string
  date: string
  description: string
  author: string
  slug: string
}

export const PostCard = (props: Props) => {
  return (
    <Card className="hover:shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={`//github.com/${props.author}.png`} />
          </Avatar>
          <span>{`@${props.author}`}</span>
        </div>
        <CardTitle className="text-md">{props.title}</CardTitle>
        <CardDescription>
          <DateTime text={props.date} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-ellipsis overflow-hidden">
          {props.description}
        </p>
      </CardContent>
    </Card>
  )
}
