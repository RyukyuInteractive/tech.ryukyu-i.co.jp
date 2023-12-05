import { join } from "path"
import { readdir } from "fs/promises"

export const getPostFileNames = async () => {
  const directory = join(process.cwd(), "_posts")

  const filePaths = await readdir(directory, "utf-8")

  return filePaths.map((path) => {
    return path.replace(".md", "")
  })
}
