import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default async function Home() {
  const session = await getUserDetails();
  if (session?.user) {
    return (
      <div>
        <Appbar />
        <Landing />
      </div>
    )
  }
  return (
    <div className="bg-slate-800">
      <Appbar />
      <Homepage />
    </div>
  );
}
