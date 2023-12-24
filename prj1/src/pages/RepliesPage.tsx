import List from "../components/List";
import Navigation from "../components/LeftSide";
import Profile from "../components/RightSide";
import Replies from "../components/Replies";

export default function RepliesPage() {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="relative w-[29rem]">
          <Navigation />
        </div>
        <Replies />
        <div className="relative w-[45rem]">
          <Profile />
        </div>
      </div>
    </>
  );
}
