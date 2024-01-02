import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { LuImagePlus } from "react-icons/lu"
import { FaArrowLeftLong } from "react-icons/fa6"
import Api from "../lib/axios"
import IProfilType from "../type/ProfilType"
import { useParams } from "react-router-dom"
import moment from "moment"
import { jwtDecode } from "jwt-decode"
import { IRepliesType } from "../type/RepliesType"
import IThreadType from "../type/ThreadType"

const Reply = () => {
  const { colorMode } = useColorMode()
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{ user: any }>(token)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleImageClick = () => {
    // Membuka dialog pemilihan gambar saat ikon diklik
    inputRef.current?.click()
  }
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

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
    setImagePreview(null)
  }

  const imagePreviewStyle: React.CSSProperties = {
    backgroundImage: `url(${imagePreview})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }
  console.log(inputValue)

  const [threads, setThreads] = useState<IProfilType[]>([])

  // Mengambil data menggunakan instance Axios
  const fetchData = async () => {
    try {
      const response = await Api.get("/thread")
      setThreads(response.data.data)
    } catch (error) {
      console.error("Gagal mengambil data:", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(
    threads.length > 0 ? threads[0].like_count : 0
  )

  const handleLikeClick = () => {
    setLiked((prevLiked: boolean) => !prevLiked)
    setLikes((prevLikes) =>
      prevLikes !== undefined && prevLikes > 0 ? prevLikes - 1 : prevLikes + 1
    )
  }

  const [thread, setThread] = useState<IThreadType | null>(null)
  const [replies, setReplies] = useState<IRepliesType[]>([])
  const { id } = useParams()
  const getThread = async () => {
    try {
      const response = await Api.get(`/thread/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setThread(response.data.data)
    } catch (error) {
      console.error("Failed to fetch thread data:", error)
    }
  }
  const getReplies = async () => {
    try {
      const response = await Api.get(`/replies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setReplies(response.data.data)
    } catch (error) {
      console.error("Failed to fetch replies:", error)
    }
  }
  console.log(thread)

  useEffect(() => {
    getThread()
    getReplies()
  }, [id])
  const [createRep, setCreateRep] = useState({})
  const handleCreateReply = async () => {
    try {
      const response = await Api.post(
        "/replies",
        {
          content: inputValue,
          threadId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log("ini response", response)

      setCreateRep(response.data.data)
    } catch (error) {
      console.error("Failed to create reply:", error)
    }
  }
  useEffect(() => {
    console.log(createRep)
  }, [createRep])
  return (
    <div className="container mx-auto border-l w-full ms-4 ">
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
        <Box className="ms-8">
          {thread && (
            <div>
              <Flex>
                <Avatar
                  name={thread.user.userName}
                  src={thread.user.profil_picture}
                  marginBottom="10px"
                />
                <Flex direction="column" marginStart={"10px"}>
                  <h2>{thread.user.fullName}</h2>
                  <h4 className="font-light flex-wrap -mt-1">
                    @{thread.user.userName}
                  </h4>
                </Flex>
              </Flex>
              <p style={{ fontSize: "13px", marginBottom: "7px" }}>
                {thread.content}
              </p>
              <img
                src={thread.image}
                style={{ borderRadius: "10px", width: "20%", height: "40%" }}
              />
              <p
                className=" text-gray-400"
                style={{ fontSize: "13px", marginTop: "15px" }}
              >
                {moment(thread.user.created_at).format(
                  " HH:mm . MMMM DD, YYYY "
                )}
              </p>
              <div className="flex justify-between mt-1 mb-7">
                <div
                  className="flex items-center  text-gray-400"
                  style={{ fontSize: "13px" }}
                >
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
                    {/* <span></span> */}
                    <span style={{ marginLeft: "4px" }}>Likes</span>
                  </p>
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="ml-2 mr-1 text-gray-400"
                  />
                  <span>{thread.replies.length}</span>
                  <span className="ms-1">Replies</span>
                </div>
              </div>
            </div>
          )}
        </Box>
        <form onSubmit={handleCreateReply}>
          <Flex className="items-center ml-2">
            <Avatar
              name="Dan Abrahmov"
              src={user.user.profil_picture}
              marginStart="20px"
              marginEnd={3}
            />
            <Input
              variant="flushed"
              placeholder="Type your reply"
              size="sm"
              className=" p-3 bg-black me-4"
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
              <button type="button">
                <LuImagePlus
                  className="text-green-500 mr-2"
                  onClick={handleImageClick}
                  size="37px"
                />
              </button>
            </label>
            <Button
              type="submit"
              backgroundColor="#22c55e"
              className="bg-[#22c55e] rounded-full w-20 text-white mr-2 font-bold p-1"
            >
              Reply
            </Button>
          </Flex>
        </form>
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
      <div className="z-[2] ms-10 me-10">
        {replies.map((reply) => (
          <div
            key={reply.id}
            className="p-3"
            style={{ borderBottom: "1px solid" }}
          >
            <div className="flex items-center -ms-1">
              <Avatar
                name={reply.user.fullName}
                src={reply.user.profil_picture}
              />
              <Flex direction="column" style={{ fontSize: "14px" }}>
                <h2 className="ml-2">{reply.user.fullName}</h2>
                <h4 className="ml-2 font-light -mt-1">
                  @{reply.user.userName}
                </h4>
              </Flex>
            </div>
            <div className="ms-14">
              <p className="mt-4" style={{ fontSize: "13px" }}>
                {reply.content}
              </p>
              <img
                src={reply.image}
                style={{ borderRadius: "10px", width: "30rem" }}
              />
              <div className="flex justify-between mt-2">
                <div className="flex items-center" style={{ fontSize: "13px" }}>
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center ${
                      liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    {likes}
                  </button>
                  <p>
                    {/* <p>0</p> */}
                    <span style={{ marginLeft: "5px" }}>Likes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reply
