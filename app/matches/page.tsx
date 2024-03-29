import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
  getAllTeams,
} from "@/database/client";

import GamesList from "../components/matches/GamesList";

export default async function Matches() {
  const { allMatches: matchesData } = await getAllMatches();
  const { allTeams: teams } = await getAllTeams();

  return (
    <div className=" flex flex-col gap-3">
      {/* <pre className="text-center">{JSON.stringify(teams, null, 2)}</pre> */}
     <GamesList />
    </div>
  );
}
