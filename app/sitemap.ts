import { config } from "@/config"
import { getPosts } from "@/lib/markdown/get-posts"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const routes: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${config.siteURL}/${post.year}/${post.month}/${post.day}/${post.slug}`,
      lastModified: post.date,
    }
  })

  return routes
}
