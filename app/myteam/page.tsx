import {
  getAllMatches,
  getMyTeams,
  fetchStatsForMyTeamsPlayers,
  fetchMyTeamPlayers,
  getFinishedMatches,
} from "@/database/client";

import MyTeamLineup from "@/app/components/myTeam/MyTeamLineup";
import MyTeams from "../components/myTeam/MyTeams";

export const revalidate = 0;

interface PlayerWithStatsAndPoints extends players {
  pointsData: {
    totalLocalPoints: number;
    totalVisitorPoints: number;
    averageLocalPoints: number;
    averageVisitorPoints: number;
  };
}

function formatAndSortPlayerData(
  players: players[],
  stats: stats[],
  matches: matches[],
  teams: myteams[]
) {
  // Initialize a map to hold player stats, keyed by playerID
  const playerStatsMap = new Map<number, stats[]>();
  stats.forEach((stat) => {
    if (!playerStatsMap.has(stat.playerID)) {
      playerStatsMap.set(stat.playerID, []);
    }
    playerStatsMap.get(stat.playerID)?.push(stat);
  });

  // Process each player to attach stats and calculate points
  const playersWithStatsAndPoints = players.map((player) => {
    const playerStats = playerStatsMap.get(player.playerID) || [];
    const pointsData = {
      totalLocalPoints: 0,
      totalVisitorPoints: 0,
      localGames: 0,
      visitorGames: 0,
      averageLocalPoints: 0,
      averageVisitorPoints: 0,
    };

    // Get all matches for the player's team
    const teamMatches = matches.filter(
      (m) =>
        m.localTeamID === player.teamID || m.visitorTeamID === player.teamID
    );

    // For each match, check if the player has stats and update pointsData accordingly
    teamMatches.forEach((match) => {
      const stat = playerStats.find((s) => s.week === match.week);
      if (stat) {
        if (match.localTeamID === player.teamID) {
          pointsData.localGames++;
          pointsData.totalLocalPoints += stat.totalPoints;
        } else {
          pointsData.visitorGames++;
          pointsData.totalVisitorPoints += stat.totalPoints;
        }
      }
    });

    pointsData.averageLocalPoints =
      pointsData.localGames > 0
        ? pointsData.totalLocalPoints / pointsData.localGames
        : 0;
    pointsData.averageVisitorPoints =
      pointsData.visitorGames > 0
        ? pointsData.totalVisitorPoints / pointsData.visitorGames
        : 0;

    return {
      ...player,
      stats: playerStats,
      pointsData,
    };
  });

  // Attach the players with all their stats to their respective teams
  const teamsWithPlayers = teams.map((team) => ({
    ...team,
    players: team.players
      .map((playerId: number) =>
        playersWithStatsAndPoints.find((p) => p.playerID === playerId)
      )
      .filter((p) => p !== undefined), // Filter out undefined to ensure all players found
  }));

  //sort players by position and then by playerID for each team
  teamsWithPlayers.forEach((team) => {
    team.players.sort((a, b) => {
      if (a.positionID < b.positionID) {
        return -1;
      }
      if (a.positionID > b.positionID) {
        return 1;
      }
      if (a.playerID < b.playerID) {
        return -1;
      }
      if (a.playerID > b.playerID) {
        return 1;
      }
      return 0;
    });
  });

  return teamsWithPlayers;
}

export default async function MyTeamPage() {
  const { myTeams } = await getMyTeams();

  // Extract player IDs from myTeams
  const playerIds = myTeams.flatMap((team) => team.players);
  // Fetch stats only for these player IDs
  const stats = await fetchStatsForMyTeamsPlayers(playerIds);
  // Fetch players for these player IDs
  const players = await fetchMyTeamPlayers(playerIds);
  // Fetch finished matches
  const { finishedMatches: finishedMatches } = await getFinishedMatches();

  // fetch all matches
  const { allMatches: matchesData } = await getAllMatches();

  const teamsWithFormattedAndCalculatedData = formatAndSortPlayerData(
    players,
    stats,
    finishedMatches,
    myTeams
  );

  return (
    <>
      {/* <h2 className="text-lg font-semibold text-center mb-2 ">MyTeams</h2> */}
      {/* <pre>{JSON.stringify(stats.slice(0, 30), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(teamsWithFormattedAndCalculatedData[0].players[0].stats, null, 2)}</pre> */}
      {/* <MyTeamLineup teamPlayers={playersWithStats} /> */}
      <MyTeams
        teams={teamsWithFormattedAndCalculatedData}
        matches={matchesData}
      />
    </>
  );
}
