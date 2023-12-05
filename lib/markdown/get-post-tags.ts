import { getPosts } from "@/lib/markdown/get-posts"

export const getPostTags = async () => {
  const posts = await getPosts()

  const tagArrays = posts.map((post) => {
    return post.tags
  })

  const duplicatedTags = tagArrays.flat()

  return Array.from(new Set(duplicatedTags))
}
