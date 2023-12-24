import { Avatar, Card, CardBody, Image, useColorMode } from "@chakra-ui/react";

const UserProfile = () => {
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
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          border={`5px solid ${colorMode === "dark" ? "#2D3748" : "white"}`}
          className="relative bottom-12 left-10"
        />
        <div className="flex justify-center items-center">
          <button className="mt-2 bottom-24 relative ml-auto rounded-full w-24 bg-green-500 hover:bg-green-900 text-white font-normal mr-2">
            Edit Profil
          </button>
        </div>
        <div className="bottom-11 relative -mt-5 ">
          <h2 style={{ fontSize: 24 }}>Dita Karang</h2>
          <h6 style={{ fontSize: 13, color: "#a3a8a5" }}>@dithacuantikk</h6>
          <p>Semua Manusia Sama Dimata Tuhan</p>
          <div className="flex items-center">
            <p className="me-2">291</p>
            <p className="me-2 font-light" style={{ fontSize: "sm" }}>
              Following
            </p>
            <p className="me-2 ">23</p>
            <p className="font-light">Followers</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default UserProfile;
