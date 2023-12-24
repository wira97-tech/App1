import UserProfile from "./UserProfile";
import Suggestion from "./Suggestion";
import Author from "./Author";

export default function Profile() {

  return (
    <div className="container mx-auto border-l mt-2 ms-4 fixed top-0">
      <>
        <UserProfile />
        <Suggestion />
        <Author />
      </>
    </div>
  );
}
