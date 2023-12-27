import { Avatar, Card, CardBody, Image, useColorMode } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store/store";
import { jwtDecode } from "jwt-decode";
// import React, { useEffect } from "react";
// import { getAllUser } from "../redux/slices/userSlice";

const UserProfile = () => {
  // const dataUser =
  //   useSelector((state: RootState) => state.user.currentUser) || [];
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token") +"";
  const user = jwtDecode<{ user: any }>(token);
  // // console.log(token.user.id);
  // useEffect(() => {
  //   // console.log(userId);
  //   if (!Array.isArray(dataUser) || dataUser.length === 0) {
  //     dispatch(getAllUser());
  //   }
  // }, [userId, dataUser, dispatch]);

  // const userLogin = Array.isArray(dataUser)
  //   ? dataUser.filter((user: any) => user.id === Number(token.user.id))
  //   : [];

  // // console.log("Token Before Decode:", userId);

  // useEffect(() => {
  //   if (Array.isArray(dataUser) && dataUser.length > 0) {
  //     // console.log("ini data user", dataUser);
  //     // console.log(userLogin);
  //   }
  // }, [dataUser, userLogin]);
  const { colorMode } = useColorMode();
  return (
    <Card maxW="sm" maxH="sm" className="rounded-md">
      <CardBody>
        <h1 className="mb-4 font-bold">My Profile</h1>
        <Image
          src="/images/bg1.jpg"
          alt="background colour"
          borderRadius="lg"
        />
            <Avatar
              size="xl"
              src={user.user.profil_picture}
              border={`5px solid ${colorMode === "dark" ? "#2D3748" : "white"}`}
              className="relative bottom-12 left-10"
            />
            <div className="flex justify-center items-center">
              <button className="mt-2 bottom-24 relative ml-auto rounded-full w-24 bg-green-500 hover:bg-green-900 text-white font-normal mr-2">
                Edit Profil
              </button>
            </div>
            <div className="bottom-11 relative -mt-5 ">
              <h2 style={{ fontSize: 20 }}>🎆✨{user.user.fullName}✨🎆</h2>
              <h6 style={{ fontSize: 13, color: "#a3a8a5" }}>
                @{user.user.userName}
              </h6>
              <p>{user.user.profil_description}</p>
              <div className="flex items-center">
                <p className="me-2">23{user.followingCount}</p>
                <p className="me-2 font-light" style={{ fontSize: "sm" }}>
                  Following
                </p>
                <p className="me-2 ">32{user.followersCount}</p>
                <p className="font-light">Followers</p>
              </div>
            </div>
         

      </CardBody>
    </Card>
  );
};
export default UserProfile;
