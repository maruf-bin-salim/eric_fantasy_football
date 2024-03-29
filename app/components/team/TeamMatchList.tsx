import { Card } from "@/components/ui/card";
import { slugById } from "@/utils/utils";
import Image from "next/image";
import React from "react";

interface Match {
  id: number;
  date: string;
  status: "finished" | "upcoming";
  // Add other properties as needed
}

export default function TeamMatchList({
  matchesData,

  teamselected,
}: {
  matchesData: matches[];

  teamselected: number;
}) {
  const playerTeam = teamselected;
  const finishedMatches = matchesData
    .filter((match) => match.matchState === 7)
    .sort(
      (a, b) =>
        new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
    );

  const upcomingMatches = matchesData.filter((match) => match.matchState !== 7);

  // Function to determine the background color based on match outcome
  const getBackgroundColor = (match, teamID) => {
    const isLocalTeam = match.localTeamID === teamID;
    const isVisitorTeam = match.visitorTeamID === teamID;

    if (
      (isLocalTeam && match.localScore > match.visitorScore) ||
      (isVisitorTeam && match.visitorScore > match.localScore)
    ) {
      return "bg-green-200"; // Win
    } else if (
      (isLocalTeam && match.localScore < match.visitorScore) ||
      (isVisitorTeam && match.visitorScore < match.localScore)
    ) {
      return "bg-red-200"; // Loss
    } else {
      return "bg-yellow-200"; // Tie
    }
  };

  return (
    <div className="flex flex-row justify-around items-start gap-2 md:gap-0 w-full">
      <div className="w-1/2 max-w-xs	">
        <h2 className="text-center text-sm pb-2 w-full">Finalizados</h2>
        <div className="flex flex-col justify-start items-center gap-1 w-full">
          {finishedMatches.map((match) => (
            <div className="w-full" key={match.matchID}>
              <Card
                className={`flex flex-col justify-between items-center min-w-[130px] w-full p-3 h-12 py-2.5 text-center  shadow-none ${getBackgroundColor(
                  match,
                  teamselected
                )}`}
              >
                <div className="flex flex-row justify-between items-center text-center h-full w-full ">
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />

                  <div className="flex justify-between items-center gap-3">
                    <p className="font-semibold text-lg">{match.localScore}</p>
                    <div className="flex flex-col justify-center w-[36px] whitespace-nowrap	">
                      <span className="font-bold text-[10px] uppercase text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          weekday: "short",
                        })}
                      </span>{" "}
                      <span className="text-[10px] uppercase font-medium text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="font-semibold text-lg">
                      {match.visitorScore}
                    </p>
                  </div>

                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 max-w-xs">
        <h2 className="text-center text-sm pb-2">Proximos</h2>
        <div className="flex flex-col justify-start items-center gap-1 w-full">
          {upcomingMatches.map((match) => (
            <div className="w-full" key={match.matchID}>
              <Card className="flex flex-col justify-between items-center min-w-[130px]	h-12 p-3 py-2.5 text-center  shadow-none">
                <div className="flex flex-row justify-between items-center text-center h-full w-full ">
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center gap-1">
                      <span className="font-bold text-[10px] uppercase text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          weekday: "short",
                        })}
                      </span>{" "}
                      <span className="text-[10px] uppercase font-medium text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="text-[11px] uppercase font-medium text-center">
                      {new Date(match.matchDate).toLocaleTimeString("es-GB", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
