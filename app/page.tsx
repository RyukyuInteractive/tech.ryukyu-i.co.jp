import { PostCard } from "@/app/_components/post-card"
import { config } from "@/config"
import { getAllPosts } from "@/lib/get-posts"
import { Metadata } from "next"
import Link from "next/link"

const HomePage = async () => {
  const allPosts = await getAllPosts()

  return (
    <main className="max-w-screen-md mx-auto px-4 pt-8 space-y-4">
      <h2 className="text-2xl">{"What's New?"}</h2>
      <div className="space-y-4">
        {allPosts.map((post) => (
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
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: config.blogTitle,
}

export default HomePage
