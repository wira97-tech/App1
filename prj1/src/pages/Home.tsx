import List from "../components/List";
import Navigation from "../components/LeftSide";
import Profile from "../components/RightSide";

export default function Home() {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="relative w-[29rem]">
          <Navigation />
        </div>
        <List />
        <div className="relative w-[45rem]">
          <Profile />
        </div>
      </div>
    </>
  );
}
