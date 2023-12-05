import { PostCard } from "@/app/_components/post-card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { config } from "@/config"
import { getPostTags } from "@/lib/markdown/get-post-tags"
import { getTagPosts } from "@/lib/markdown/get-tag-posts"
import { Metadata } from "next"
import Link from "next/link"

type Props = {
  params: {
    tag: string
  }
}

const TagPage = async (props: Props) => {
  const posts = await getTagPosts(props.params.tag)

  const tags = await getPostTags()

  return (
    <main className="max-w-screen-md mx-auto px-4 pt-8 space-y-8">
      <nav className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Badge className="block hover:underline">{tag}</Badge>
          </Link>
        ))}
      </nav>
      <Separator />
      <h2 className="text-2xl">{`タグ「${props.params.tag}」に関連する記事`}</h2>
      <section className="space-y-4">
        {posts.map((post) => (
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
    </main>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  return {
    title: `${props.params.tag} - ${config.blogTitle}`,
  }
}

export const generateStaticParams = async () => {
  const tags = await getPostTags()
  return tags.map((tag) => {
    return { tag: tag }
  })
}

export default TagPage
