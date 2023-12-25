import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Link,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import Api from "../lib/axios";
import IProfilType from "../type/ProfilType";
import { useParams } from "react-router-dom";
import { response } from "express";

const Replies = () => {
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  console.log("input value:", inputValue);

  const [threads, setThreads] = useState<IProfilType[]>([]);

  // Mengambil data menggunakan instance Axios
  const fetchData = async () => {
    try {
      const response = await Api.get("/thread");
      setThreads(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  useEffect(() => {
    fetchData();
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

  const [thread, setThread] = useState<IProfilType | null>(null);
  const { id } = useParams();
  const fetchDataFromApi = async () => {
    try {
      const response = await Api.get(`/thread/${id}`);
      setThread(response.data.data);
    } catch (error) {
      console.error("Failed to fetch thread data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [id]);
  console.log("ini ID", id);

  return (
    <div className="container mx-auto border-l mt-4 w-full ms-4 ">
      <div
        className={` top-0 sticky ${
          colorMode === "dark" ? "bg-[#1a202c]" : "bg-white"
        } p-5 z-[3]`}
      >
        <Link href="/home" textDecoration="none">
          <Text
            fontSize="larger"
            className="font-bold mb-6 ml-2 flex items-center"
          >
            <span className="flex me-3">
              <FaArrowLeftLong />
            </span>
            Status
          </Text>
        </Link>
        <Text className="ms-3">
          {thread && (
            <div>
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                marginBottom="10px"
              />
              <h2>{thread.fullName}</h2>
              <p>{thread.content}</p>
              <p> {thread.image}</p>
              <p>{thread.postedAt}</p>
              <div className="flex justify-between mt-2 mb-7">
                <div className="flex items-center">
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center ${
                      liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    {likes}
                  </button>{" "}
                  <p>
                    <p>{thread.like_count}</p>
                    <span>Likes</span>
                  </p>
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="ml-2 mr-1 text-gray-400"
                  />
                  <span>{thread.replies}</span>
                  <span>Replies</span>
                </div>
              </div>
            </div>
          )}
        </Text>
        <Flex className="items-center ml-2">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Input
            variant="flushed"
            placeholder="Type your reply"
            size="sm"
            className="mr-2 ml-2 p-1 bg-black"
            onChange={handleInputChange}
            resize="none"
          />
          <label className="relative cursor-pointer items-center ">
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <button>
              <LuImagePlus
                className="text-green-500 mr-2"
                onClick={handleImageClick}
                size="37px"
              />
            </button>
          </label>
          <Button
            backgroundColor="green"
            className="bg-green-500 rounded-full w-20 text-white mr-2 font-bold p-1"
          >
            Reply
          </Button>
        </Flex>
        {imagePreview && (
          <div
            className="w-20 h-20 overflow-hidden ml-16"
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
      <div className="z-[2] ms-4">
        {threads.map((thread: IProfilType) => (
          <div key={thread.id} className="border p-3 mb-4">
            <div className="flex items-center">
              <Avatar name={thread.fullName} src={thread.image} />
              <p className="ml-2 font-bold">{thread.userName}</p>
            </div>
            <p className="mt-2">{thread.content}</p>
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <button
                  onClick={handleLikeClick}
                  className={`flex items-center ${
                    liked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  {likes}
                </button>{" "}
                <p>
                  <p>{thread.like_count}</p>
                  <span>Likes</span>
                </p>
                <FontAwesomeIcon
                  icon={faMessage}
                  className="ml-2 mr-1 text-gray-400"
                />
                <span>{thread.replies}</span>
                <span>Replies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Replies;
{
}
