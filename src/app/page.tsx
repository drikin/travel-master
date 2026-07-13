import { tripData } from "@/lib/data";
import LoginGate from "@/components/LoginGate";
import TripContent from "@/components/TripContent";

export default function Home() {
  return (
    <LoginGate data={tripData}>
      <TripContent data={tripData} />
    </LoginGate>
  );
}
