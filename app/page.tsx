import { PostCard } from "@/app/_components/post-card"
import { Badge } from "@/components/ui/badge"
import { config } from "@/config"
import { getPostTags } from "@/lib/markdown/get-post-tags"
import { getPosts } from "@/lib/markdown/get-posts"
import { Metadata } from "next"
import Link from "next/link"

const HomePage = async () => {
  const posts = await getPosts()

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
      <div className="flex gap-x-4">
        <h2 className="text-2xl font-bold">{"What's New?"}</h2>
      </div>
      <section className="space-y-4">
        {posts.map((post) => (
          <article key={post.key}>
            <Link href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}>
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

export const metadata: Metadata = {
  title: config.siteTitle,
}

export default HomePage
