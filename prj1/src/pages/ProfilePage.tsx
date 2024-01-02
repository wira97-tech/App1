import List from "../components/List";
import Navigation from "../components/LeftSide";
import UserProfile from "../components/UserProfile";
import Profile from "../components/Profile";
import RightSide from "../components/RightSide";

export default function ProfilePage() {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="relative w-[29rem]">
          <Navigation />
        </div>
        <div className="w-full mt-2">
          <Profile />
        </div>
        <div className="relative w-[45rem]">
          <RightSide />
        </div>
      </div>
    </>
  );
}
