import { getAllMatches, getAllTeams } from "@/database/client";
import CalendarList from "../components/calendar/Calendar";

export default async function Calendar() {
  const { allMatches: matchesData } = await getAllMatches();
  const { allTeams: teams } = await getAllTeams();

  return (
    <div className=" flex flex-col gap-3">
      <CalendarList matches={matchesData} allTeams={teams} gamesToShow={6} />
    </div>
  );
}
