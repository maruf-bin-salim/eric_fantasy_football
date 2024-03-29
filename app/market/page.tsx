import React from "react";
import NewMarketUp from "../components/market/NewMarketUp";
import NewMarketDown from "../components/market/NewMarketDown";
import {  getAllPlayers, getAllStats, getMatchesByTeamID } from "@/database/client";

type Props = {};

export default async function page (props: Props) {
  
  const { allPlayers: players } = await getAllPlayers();
  const { allStats: stats } = await getAllStats();
  

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NewMarketUp />
      <NewMarketDown />
    </main>
  );
};

