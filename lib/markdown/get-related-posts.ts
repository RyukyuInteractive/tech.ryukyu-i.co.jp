import { getPost } from "@/lib/markdown/get-post"
import { getPosts } from "@/lib/markdown/get-posts"

export const getRelatedPosts = async (
  year: string,
  month: string,
  day: string,
  slug: string,
) => {
  const targetPost = await getPost(year, month, day, slug)

  const posts = await getPosts()

  return posts.filter((post) => {
    if (post.slug === slug) return false
    return targetPost.tags.some((tag) => {
      return post.tags.includes(tag)
    })
  })
}
