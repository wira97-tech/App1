export type IRepliesType = {
  id: number
  content: string
  image: string
  postedAt: string
  user: {
    id: number
    userName: string
    fullName: string
    email: string
    password: string
    profil_picture: string
    profil_description: string
    created_at: string
    updated_at: string
  }
  replies: [
    {
      id: number
      content: string
    }
  ]
}
