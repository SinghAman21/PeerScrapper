export interface Project {
  id: bigint
  name: string
  publisher: string
  tagline: string
  categories: string[]
  upvotes: number
  url: string
  direct_link: string
  image_url: string
  detail_description: string
}