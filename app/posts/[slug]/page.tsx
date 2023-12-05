import { DateTime } from "@/app/_components/date-time"
import { PostCard } from "@/app/_components/post-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { config } from "@/config"
import { getPost } from "@/lib/markdown/get-post"
import { getPostTags } from "@/lib/markdown/get-post-tags"
import { getPosts } from "@/lib/markdown/get-posts"
import { getRelatedPosts } from "@/lib/markdown/get-related-posts"
import { Metadata } from "next"
import Link from "next/link"
import Markdown from "react-markdown"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight"

type Props = {
  params: {
    slug: string
  }
}

const PostPage = async (props: Props) => {
  const post = await getPost(props.params.slug)

  const tags = await getPostTags()

  const relatedPosts = await getRelatedPosts(post.slug)

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
        <Markdown
          className={"leading-relaxed"}
          components={{
            h1(props) {
              const { node, ...rest } = props
              return (
                <h2
                  className="text-3xl font-bold mt-12 mb-4 leading-snug"
                  {...rest}
                />
              )
            },
            h2(props) {
              const { node, ...rest } = props
              return (
                <h3
                  className="text-2xl font-bold mt-8 mb-4 leading-snug"
                  {...rest}
                />
              )
            },
            p(props) {
              const { node, ...rest } = props
              return <p className="my-2" {...rest} />
            },
            a(props) {
              const { node, ...rest } = props
              return (
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  {...rest}
                />
              )
            },
            ul(props) {
              const { node, ...rest } = props
              return <ul className="my-2 list-disc list-inside" {...rest} />
            },
            ol(props) {
              const { node, ...rest } = props
              return <ol className="my-2" {...rest} />
            },
            blockquote(props) {
              const { node, ...rest } = props
              return <blockquote className="my-2" {...rest} />
            },
            pre(props) {
              if (!props.node || props.node.type !== "element") {
                return null
              }
              const [elementNode] = props.node.children
              if (elementNode.type !== "element") {
                return null
              }
              const [textNode] = elementNode.children
              if (textNode.type !== "text") {
                return null
              }
              const codeClassNames = elementNode.properties.className
              if (
                typeof codeClassNames !== "object" ||
                codeClassNames === null
              ) {
                return null
              }
              const [codeClassName] = codeClassNames
              if (typeof codeClassName !== "string") {
                return null
              }
              const language = codeClassName.replace("language-", "")
              return (
                <SyntaxHighlighter
                  className="my-2 shadow"
                  language={language}
                  style={dracula}
                >
                  {textNode.value}
                </SyntaxHighlighter>
              )
            },
          }}
        >
          {post.body}
        </Markdown>
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
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
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
  const post = await getPost(props.params.slug)
  return {
    title: `${post.title} - ${config.blogTitle}`,
  }
}

export const generateStaticParams = async () => {
  const posts = await getPosts()
  return posts.map((post) => {
    return {
      slug: post.slug,
    }
  })
}

export default PostPage
