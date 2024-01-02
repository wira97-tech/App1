import Follow from "../components/Follow";
import Navigation from "../components/LeftSide";
import Profile from "../components/RightSide";

export default function FollowPage() {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="relative w-[29rem]">
          <Navigation />
        </div>
        <div className="w-full">
          <Follow />
        </div>
        <div className="relative w-[45rem]">
          <Profile />
        </div>
      </div>
    </>
  );
}
