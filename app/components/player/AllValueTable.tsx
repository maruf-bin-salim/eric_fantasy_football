"use client";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatMoney } from "@/utils/utils";
import { ChevronsDown, ChevronsUp } from "lucide-react";

type Props = {
  fetchedPlayer: any;
};

export default function AllValueTable({
  
  playerData,
  playerStat,
}: {
 
  playerData: players;
  playerStat: stats[];
}) {

  // const last60DaysData = fetchedPlayer.marketValues.slice(-60);
  // const percentage = 0.1;

  // const chartData = [
  //   ["Date", "Market Value"],
  //   ...last60DaysData.map((entry) => [
  //     new Date(entry.date).toLocaleDateString("es-EU", {
  //       month: "short",
  //       day: "numeric",
  //     }),
  //     entry.marketValue,
  //   ]),
  // ];

  function formatPlayerWithStats(playerData: players, playerStat: stats[]) {
    // Filter the stats for the given player
    const playerStats = playerStat.filter(stat => stat.playerID === playerData.playerID);
    
    // Return the formatted player data with their stats
    return { playerData, stats: playerStats };
}


const prepareValueChangesData = (playerWithStats: players) => {
  if (playerWithStats && playerWithStats.playerData.marketValues) {
    const playerValueChanges = [];

    for (let i = 1; i < playerData.marketValues.length; i++) {
      const currentDate = playerData.marketValues[i].date;
      const previousDate = playerData.marketValues[i - 1].date;
      const currentValue = playerData.marketValues[i].marketValue;
      const previousValue = playerData.marketValues[i - 1].marketValue;

      const valueChange = currentValue - previousValue;
      const percentageChange = ((currentValue - previousValue) / previousValue) * 100;

      playerValueChanges.push({
        date: currentDate,
        valueChange,
        percentageChange,
        newValue: currentValue,
      });
    }

    const last20ValueChanges = playerValueChanges.reverse();
    return last20ValueChanges;
  }
  return [];
};


  const playersWithStats = formatPlayerWithStats(
    playerData,
    playerStat
  );
  // const marketValueArray = last60DaysData.map((entry) => entry.marketValue);

  return (
    // <pre>{JSON.stringify(playersWithStats, null, 2)}</pre>
    <Card className="h-96 pt-0 px-4 md:px-8 w-full flex flex-col justify-between items-center  border-none shadow-none">
      
      <Table className="m-auto w-full  mt-1">
        <TableHeader className=" ">
          <TableRow className=" items-center ">
            <TableHead className=" font-extrabold text-left w-full text-xs">
              Fecha
            </TableHead>
            <TableHead className="ml-2 w-full flex flex-row justify-center items-center ">
              <ChevronsDown
                size={14}
                className=" text-red-500 dark:text-red-400"
              />
              <ChevronsUp
                size={14}
                className="text-green-600 dark:text-green-400"
              />
            </TableHead>
            <TableHead className=" font-extrabold text-center text-xs w-full">
              %
            </TableHead>
            <TableHead className=" font-extrabold text-right text-xs w-full">
              $ Actual
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prepareValueChangesData(playersWithStats as any).map(
            (change, index) => (
              <TableRow key={index}>
                <TableCell className="text-left py-1 text-xs tabular-nums tracking-tight w-fit whitespace-nowrap">
                  {formatDate(change.date)}
                </TableCell>
                <TableCell className="py-1 text-xs">
                  <div className="flex  flex-row items-center justify-end">
                    <div
                      className={`font-bold tabular-nums tracking-tight 
                                          ${
                                            change.valueChange < 0
                                              ? "text-red-500 dark:text-red-400"
                                              : "text-green-600 dark:text-green-400"
                                          }`}
                    >
                      {formatMoney(change.valueChange)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-1  ">
                  <div
                    className={`text-[11px] mr-2 font-semibold ml-2 tabular-nums tracking-tight text-right ${
                      change.percentageChange < 0
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {change.percentageChange !== undefined
                      ? `${change.percentageChange.toFixed(2)}%`
                      : ""}
                  </div>
                </TableCell>
                <TableCell className="py-1 text-right text-xs  tabular-nums tracking-tighter	">
                  {formatMoney(change.newValue)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <CardFooter className="pt-2 pb-0 text-xs  font-extralight">
        Cambios de Valor (Toda la temporada)
      </CardFooter>
    </Card>
  );
};


