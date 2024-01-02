export default interface IThreadType {
  id: number
  content: string
  image: string
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
  replies: []
  postedAt: string
}
