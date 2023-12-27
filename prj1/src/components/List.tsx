import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Flex, Input, Textarea, useColorMode } from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import Api from "../lib/axios";
import IProfilType from "../type/ProfilType";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const List = () => {
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [Image, setNewImage] = useState<File>();
  const token = localStorage.getItem("token") + "";
  const user = jwtDecode<{ user: any }>(token);

  const handleImageClick = () => {
    // Membuka dialog pemilihan gambar saat ikon diklik
    inputRef.current?.click();
  };
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);

      if (e.target.files && e.target.files[0]) {
        setNewImage(e.target.files[0]);
      }
    }
  };

  // const [liked, setLiked] = useState(false);
  // const [likes, setLikes] = useState(0);

  // const handleLikeClick = () => {
  //   if (!liked) {
  //     setLiked(true);
  //     setLikes(likes + 1);
  //   } else {
  //     setLiked(false);
  //     setLikes(likes - 1);
  //   }
  // };

  const clearImagePreview = () => {
    setImagePreview(null);
  };

  const imagePreviewStyle: React.CSSProperties = {
    backgroundImage: `url(${imagePreview})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {});

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  console.log("input value:", inputValue);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", Image!);
    formData.append("content", inputValue);
    const response = await Api.post("/thread", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    setInputValue("");
    setNewImage(undefined);
    clearImagePreview();
  };
  console.log(Image);
  console.log(inputValue);

  const [threads, setThreads] = useState<IProfilType[]>([]);

  // Mengambil data menggunakan instance Axios
  const fetchDataFromApi = async () => {
    try {
      const response = await Api.get("/thread");
      setThreads(response.data.data);
      console.log("ini response", response);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    threads.length > 0 ? threads[0].like_count : 0
  );

  const handleLikeClick = () => {
    setLiked((prevLiked: boolean) => !prevLiked);
    setLikes((prevLikes) =>
      prevLikes !== undefined && prevLikes > 0 ? prevLikes - 1 : prevLikes + 1
    );
  };

  return (
    <div className="container mx-auto border-l w-full ms-4 ">
      <div
        className={` top-0 sticky ${
          colorMode === "dark" ? "bg-[#1a202c]" : "bg-white"
        } p-5 z-[3]`}
      >
        <h1 className="font-bold mb-6 ml-2">Home</h1>

        <form className="flex ms-8" onSubmit={handleSubmit}>
          <Avatar name="Dan Abrahmov" src={user.user.profil_picture} />
          <Input
            placeholder="What's Happening ?"
            value={inputValue}
            size="lg"
            className="mr-2 ml-2 p-1 bg-black"
            onChange={handleInputChange}
            resize="none"
            border="none"
          />
          <label
            htmlFor="file"
            className="relative cursor-pointer items-center "
          >
            <input
              ref={inputRef}
              type="file"
              id="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <button type="button">
              <LuImagePlus
                className="text-green-500 mr-2"
                onClick={handleImageClick}
                size="48px"
              />
            </button>
          </label>
          <button
            type="submit"
            className="bg-green-500 rounded-xl w-40 text-white mr-2 font-bold p-1 h-12"
          >
            Post
          </button>
        </form>

        {imagePreview && (
          <div
            className="w-20 h-20 overflow-hidden ml-24"
            style={imagePreviewStyle}
          >
            <button
              className="w-full h-full flex items-center justify-center bg-black bg-opacity-50"
              onClick={clearImagePreview}
            >
              X
            </button>
          </div>
        )}
      </div>
      <div className="z-[2] ms-10 me-10">
        {threads.map((thread: IProfilType) => (
          <div
            key={thread.id}
            className="p-3"
            style={{ borderBottom: "1px solid" }}
          >
            <Link to={`/thread/${thread.id}`} className="">
              <div className="flex items-center">
                <Avatar name={thread.fullName} src={thread.profil_picture} />
                <p className="ml-2 font-bold">{thread.userName}</p>
              </div>
              <p className="mt-2 mb-2" style={{ fontSize: "13px" }}>
                {thread.content}
              </p>
              {thread.image && (
                <img
                  src={`http://localhost:5000/${thread.image}`}
                  style={{ borderRadius: "10px", width: "30rem" }}
                />
              )}
              <div className="flex justify-between mt-2">
                <div className="flex items-center  text-gray-400">
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center ${
                      liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    {likes}
                  </button>{" "}
                  <p className="gap-3">{thread.like_count}</p>{" "}
                  <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                    Likes
                  </span>
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="ml-2 mr-1 text-gray-400"
                  />
                  <span>{thread.replies}</span>
                  <span style={{ fontSize: "13px" }}>Replies</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
