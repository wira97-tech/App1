export default interface IProfilType {
  id: number;
  fullName: string;
  userName: string;
  profil_picture: string;
  profil_description: string;
  isLiked: boolean;
  like_count: number;
  replies: number;
  postedAt: string;
}
