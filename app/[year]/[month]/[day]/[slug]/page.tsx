import { DateTime } from "@/app/_components/date-time"
import { PostCard } from "@/app/_components/post-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getPost } from "@/lib/markdown/get-post"
import { getPostTags } from "@/lib/markdown/get-post-tags"
import { getPosts } from "@/lib/markdown/get-posts"
import { getRelatedPosts } from "@/lib/markdown/get-related-posts"
import { Metadata } from "next"
import Link from "next/link"
import markdownToHtml from "zenn-markdown-html"

type Props = {
  params: {
    year: string
    month: string
    day: string
    slug: string
  }
}

const PostPage = async (props: Props) => {
  const post = await getPost(
    props.params.year,
    props.params.month,
    props.params.day,
    props.params.slug,
  )

  const tags = await getPostTags()

  const relatedPosts = await getRelatedPosts(
    props.params.year,
    props.params.month,
    props.params.day,
    post.slug,
  )

  const html = markdownToHtml(post.body)

  return (
    <main className="max-w-screen-md mx-auto px-4 space-y-8">
      <article className="space-y-4 pt-8">
        <Link
          className="block w-fit hover:underline"
          href={`//github.com/${post.author}`}
        >
          <div className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage
                alt={post.author}
                src={`//github.com/${post.author}.png`}
              />
            </Avatar>
            <span>{`@${post.author}`}</span>
          </div>
        </Link>
        <h1 className="font-bold text-3xl">{post.title}</h1>
        <DateTime text={post.date} />
        {0 < post.tags.length && (
          <section className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <Badge className="block hover:underline">{tag}</Badge>
              </Link>
            ))}
          </section>
        )}
        <div
          className="znc font-medium"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <Separator />
      <section className="space-y-4">
        <h2 className="font-bold">{"その他のタグ"}</h2>
        <nav className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge className="block hover:underline">{tag}</Badge>
            </Link>
          ))}
        </nav>
      </section>
      {relatedPosts.length > 0 && <Separator />}
      {relatedPosts.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-bold">{"関連する記事"}</h2>
          {relatedPosts.map((post) => (
            <article key={post.key}>
              <Link
                href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
              >
                <PostCard
                  title={post.title}
                  date={post.date}
                  description={post.description}
                  author={post.author}
                  slug={post.slug}
                />
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const post = await getPost(
    props.params.year,
    props.params.month,
    props.params.day,
    props.params.slug,
  )
  return {
    title: post.title,
  }
}

export const generateStaticParams = async () => {
  const posts = await getPosts()
  return posts.map((post) => {
    return {
      slug: post.slug,
      year: post.year,
      month: post.month,
      day: post.day,
    }
  })
}

export default PostPage
