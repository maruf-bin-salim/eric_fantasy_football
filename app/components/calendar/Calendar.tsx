
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import { Card } from "@/components/ui/card";
import { getUpcomingMatches, slugById } from "@/utils/utils"; // Make sure the path is correct
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface CalendarListProps {
  matches: matches[];
  allTeams: teams[];
  gamesToShow: number;
}

export default function CalendarList({
  matches,
  allTeams,
  gamesToShow,
}: CalendarListProps) {
  return (
    <>
      <p className="text-center text-xl uppercase font-semibold ">
        CALENDARIO
      </p>
      <div className="flex flex-col justify-start items-center">
        {allTeams.map((team) => {
          // Get upcoming matches for this specific team
          const teamUpcomingMatches = getUpcomingMatches(
            matches.filter(
              (match) =>
                match.localTeamID === team.teamID ||
                match.visitorTeamID === team.teamID
            ),
            gamesToShow
          );

          return (
            <div
              key={team.teamID}
              className="flex flex-col justify-center items-center"
            >
              <Separator className="w-full my-2" />
              <div className="flex flex-row justify-end items-center md:gap-4 gap-3">
                <div className="flex flex-col justify-center items-center w-10 h-10 border shadow-md rounded ">
                  <Image
                    src={`/teamLogos/${slugById(team.teamID)}.png`}
                    alt={team.name}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className="h-7 "
                  />
                </div>
                {teamUpcomingMatches.map((match) => (
                  <div key={match.matchID}>
                    <Card className="flex flex-col justify-between items-center border-none shadow-none text-xs text-center  w-12 h-full ">
                      {team.teamID !== match.localTeamID && (
                        <Image
                          src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                          alt="home"
                          width={36}
                          height={36}
                          style={{ objectFit: "contain" }}
                          className="h-6 "
                        />
                      )}

                      {team.teamID !== match.visitorTeamID && (
                        <Image
                          src={`/teamLogos/${slugById(
                            match.visitorTeamID
                          )}.png`}
                          alt="visitor"
                          width={36}
                          height={36}
                          style={{ objectFit: "contain" }}
                          className="h-6 "
                        />
                      )}

                      <p className="text-[10px] uppercase font-medium text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className="leading-none">
                        {team.teamID !== match.localTeamID ? (
                          <FlightIcon fontSize="small" className="rotate-45 " />
                        ) : (
                          <HomeIcon fontSize="small" />
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
