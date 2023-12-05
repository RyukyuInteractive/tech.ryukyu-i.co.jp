import { join } from "path"
import { MarkdownPost } from "@/lib/types/markdown-post"
import { readFile } from "fs/promises"
import matter from "gray-matter"

const postsDirectory = join(process.cwd(), "_posts")

export const getPost = async (
  year: string,
  month: string,
  day: string,
  slug: string,
): Promise<MarkdownPost> => {
  const fullPath = join(postsDirectory, `${year}-${month}-${day}-${slug}.md`)

  const fileText = await readFile(fullPath, "utf-8")

  const { data, content } = matter(fileText)

  const description = content.slice(0, 140)

  return {
    slug: slug,
    title: data.title,
    description: data.description ?? `${description}...`,
    date: data.date,
    author: data.author,
    body: content,
    tags: data.tags ?? [],
    year: year,
    month: month,
    day: day,
    key: `${year}-${month}-${day}-${slug}`,
  }
}
