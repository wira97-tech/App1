import List from "../components/List"
import Navigation from "../components/LeftSide"
import Profile from "../components/RightSide"
import Search from "../components/Search"

export default function SearchPage() {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="relative w-[29rem]">
          <Navigation />
        </div>
        <div className=" w-full mt-4">
          <Search />
        </div>
        <div className="relative w-[45rem]">
          <Profile />
        </div>
      </div>
    </>
  )
}
