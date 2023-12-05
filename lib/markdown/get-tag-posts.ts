import { getPosts } from "@/lib/markdown/get-posts"

export const getTagPosts = async (tag: string) => {
  const posts = await getPosts()

  return posts.filter((post) => {
    return post.tags.includes(tag)
  })
}
