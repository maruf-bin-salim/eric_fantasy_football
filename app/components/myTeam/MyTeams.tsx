"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import Link from "next/link";

import { supabase } from "@/database/supabase";

import {
  formatMoney,
  formatter,
  getColor,
  getNextGames,
  getPositionBadge,
  lastChangeStyle,
  slugById,
} from "@/utils/utils";
import Image from "next/image";
import NextMatchesValueTable from "./MyTeamMatchesValueTable";
import PointHistoryTable from "./MyTeamPointHistoryTable";
import Authentication from "../auth/Auth";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getAllSquads } from "@/database/client";


interface PlayerWithStats extends players {
  stats: stats[];
}

const MyTeams = ({ teams, matches }: { teams: any; matches: matches[] }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || null);
  const [session, setSession] = useState(null);
  const [squads, setSquads] = useState([]);



  useEffect(() => {
    const data = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      setSession(session);
    });
    return () => {
      data.data.subscription.unsubscribe();
    };


  }, []);

  useEffect(() => {
    const fetchSquads = async () => {
      const { allSquads } = await getAllSquads();
      console.log(allSquads);
      setSquads(allSquads || []);
    };

    fetchSquads();
  }, []);

  console.log("sqads", squads);

  const handleTeamSelect = (teamId: string) => {
    const team = teams.find((team) => team.myTeamID.toString() === teamId);
    setSelectedTeam(team || null);
  };

  const Logout = async () => {
    await supabase.auth.signOut();

  }

  const selectedTeamPlayers = selectedTeam?.players || [];
  // console.log(selectedTeamPlayers);
  const numberOfPlayers = selectedTeamPlayers.length;
  const totalMarketValue = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.marketValue,
    0
  );
  const totalLastChange = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.lastMarketChange,
    0
  );

  if (!session) {
    return (<Authentication supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <>
        <Link href="/squads">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Create Squad
          </button>
        </Link>

        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Squads</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-bold">Squad Name</div>
            <div className="font-bold">Players</div>
            <div className="font-bold">Actions</div>
            {squads.map(squad => (
              <React.Fragment key={squad.squadID}>
                <div>{squad.squadName}</div>
                <div>{squad.players.length}/26</div>

                <div>
                  <Link href={`squads/editSquad/${squad.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Edit
                  </Link>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>

              </React.Fragment>
            ))}
          </div>
        </div>



        <div>
          <button onClick={Logout}>Logout</button>
        </div>
        {/* <pre className="">{JSON.stringify(matches.slice(0, 30), null, 2)}</pre> */}
        {/* <pre className="">{JSON.stringify(selectedTeamPlayers[1].teamID, null, 2)}</pre> */}
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-lg font-semibold text-center my-1">Mis Equipos</h2>
          <div className="flex w-full md:flex-row flex-col justify-between items-center gap-4">
            {/* TEAM SELECT */}

            <Select
              value={selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
              onValueChange={handleTeamSelect}
            >
              <SelectTrigger className="rounded-sm border bg-card text-card-foreground shadow h-full md:w-1/4">
                <SelectValue>
                  {selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem
                    key={team.myTeamID}
                    value={team.myTeamID.toString()}
                  >
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* TEAM INFO CARD */}
            <Card className="transition-all flex flex-row justify-between items-center gap-6 md:gap-8 md:px-6 px-4 py-2 md:w-3/4 w-full text-xs md:text-sm h-full md:h-10 ">
              <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 w-full ">
                <div className="flex flex-row justify-center items-center">
                  <p className=" font-normal mr-2">Valor:</p>
                  <p className=" font-bold">
                    {formatter.format(totalMarketValue)}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <p className=" font-normal mr-2">Cambio:</p>

                  {totalLastChange > 0 ? (
                    <ChevronsUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <ChevronsDown className="w-4 h-4 text-red-500" />
                  )}
                  <p
                    className={`font-bold text-right tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                      totalLastChange
                    )}`}
                  >
                    {" "}
                    {formatter.format(totalLastChange)}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <p className=" font-normal mr-2	">Jugadores:</p>
                  <p className=" font-bold">{numberOfPlayers} /26</p>
                </div>
              </div>
            </Card>
          </div>
          {/* NEXT MATCHES & VALUE TABLE */}
          {selectedTeam && (
            <NextMatchesValueTable
              players={selectedTeamPlayers}
              matches={matches}
            />
          )}

          {/* POINT HISTORY TABLE */}
          {selectedTeam && (
            <PointHistoryTable players={selectedTeamPlayers} matches={matches} />
          )}
        </div>
      </>
    );
  }


};



export default MyTeams;
