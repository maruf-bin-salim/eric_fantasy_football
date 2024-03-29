import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
  getAllTeams,
  getAllNews,
} from "@/database/client";





export default async function News() {
  const { allMatches: matchesData } = await getAllMatches();
  const { allTeams: teams } = await getAllTeams();
  const { allNews: news } = await getAllNews();

  return (
    <div className=" flex flex-col gap-3">
      {/* <pre className="text-center">{JSON.stringify(teams, null, 2)}</pre> */}
      {/* <Calendar matches={matchesData} allTeams={teams} gamesToShow={6} /> */}
      <p className="text-center text-lg font-bold">
        NEWS Page
        {JSON.stringify(news)}
      </p>
    </div>
  );
}
