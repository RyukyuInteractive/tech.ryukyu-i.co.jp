import { getPost } from "@/lib/markdown/get-post"
import { getPostFileNames } from "@/lib/markdown/get-post-file-names"

export const getPosts = async () => {
  const fileNames = await getPostFileNames()

  const promises = fileNames.map((fileName) => {
    const [year, month, day, ...texts] = fileName.split("-")
    const slug = texts.join("-")
    return getPost(year, month, day, slug)
  })

  const posts = await Promise.all(promises)

  return posts.sort((post1, post2) => {
    return post1.date > post2.date ? -1 : 1
  })
}
