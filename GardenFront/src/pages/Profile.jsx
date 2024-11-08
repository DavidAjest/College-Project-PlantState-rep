import GardenPanel from "../components/GardenPanel/GardenPanel";
import { useAuth } from "../context/AuthContext";
import AuthenticatedGuard from "../guards/Authenticated";
import QnA from "./qa/QnA";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="grid place-items-center p-4">
      <GardenPanel />
      <br/>
      <QnA />
    </div>
  );
}

export default ProfilePage;
