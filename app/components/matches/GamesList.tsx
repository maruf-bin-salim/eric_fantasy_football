"use client";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

import { getAllMatches } from "@/database/client";



import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentWeek, slugById } from "@/utils/utils";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Your component
export default function GamesList() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1); // Fix 1: Specify the type of selectedWeek as number
  // Using SWR to fetch data
  const {
    data: matches,
    error,
    isLoading,
  } = useSWR("/api/user", getAllMatches);

  useEffect(() => {
    if (matches && Array.isArray(matches.allMatches)) {
      const initialWeek = getCurrentWeek(matches.allMatches);
      setSelectedWeek(initialWeek);
    }
  }, [matches]);

  // Handling errors
  if (error) {
    console.error("Error fetching matches:", error);
    return <div>Error fetching matches</div>;
  }

  const handleWeekChange = (value: string) => {
    // Fix 2: Change the type of value to string
    setSelectedWeek(parseInt(value)); // Fix 3: Parse the string value to number
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => Math.max(1, prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => Math.min(38, prevWeek + 1));
  };

  // Displaying skeleton while loading
  if (isLoading) {
    return (
      <div className="flex flex-col justify-start items-center h-full overflow-y-auto">
        <div className="flex flex-row justify-center items-center w-full mt-5">
          <p className="text-xl font-semibold">PARTIDOS</p>
        </div>

        <div className="flex justify-between items-center m-auto mt-4 mb-5 gap-4">
        <Button variant="outline" onClick={handlePrevWeek} className="mr-3 ">
          <ChevronLeftIcon />
        </Button>
          <Select
            value={selectedWeek.toString()}
            onValueChange={handleWeekChange}
            disabled
          >
            <SelectTrigger>
              <SelectValue>{`Jornada ${selectedWeek}`}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 38 }, (_, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {" "}
                  {/* Fix 4: Convert the number to string */}
                  {`Jornada ${index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleNextWeek} className="ml-3">
          <ChevronRightIcon />
        </Button>
        </div>
        <Separator className=" mb-4" />
        <div className="grid grid-cols-2 gap-4 mx-auto">
          {/* Display matches for the selected week */}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index}>
              <Card className="flex flex-col justify-between items-center w-[155px] h-full py-[6px] text-center ">
                <Skeleton className="h-[8px] w-7 mb-2" />
                <div className="flex flex-row justify-between w-full items-center ">
                  <Skeleton className="h-7 ml-3 w-7 rounded-full" />
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-2 w-2" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </div>

                  <Skeleton className="h-7 mr-3 rounded-full w-7" />
                </div>
                <Skeleton className="h-[9px] w-7 mt-2" />
              </Card>
            </div>
          ))}
        </div>
        <Separator className=" mt-4" />
      </div>
    );
  }

  // Displaying matches
  return (
    <div className="flex flex-col justify-start items-center h-full overflow-y-auto">
      <div className="flex flex-row justify-center items-center w-full mt-5">
        <p className="text-xl font-semibold">PARTIDOS</p>
      </div>
      <div className="flex justify-between items-center my-4 gap-4">
      <Button variant="outline" onClick={handlePrevWeek} className="mr-3 ">
          <ChevronLeftIcon />
        </Button>
        <Select
          value={selectedWeek.toString()}
          onValueChange={handleWeekChange}
        >
          <SelectTrigger>
            <SelectValue>{`Jornada ${selectedWeek}`}</SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[var(--radix-select-content-available-height)] ">
            {Array.from({ length: 38 }, (_, index) => (
              <SelectItem key={index + 1} value={(index + 1).toString()}>
                {" "}
                {`Jornada ${index + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleNextWeek} className="ml-3">
          <ChevronRightIcon />
        </Button>
      </div>
      <Separator className=" mb-4" />
      <div className=" flex justify-center items-center flex-wrap mx-auto">
        {/* Display matches for the selected week */}
        {matches &&
          matches.allMatches
            .filter((match) => match.week === selectedWeek)
            .sort(
              (a, b) =>
                new Date(a.matchDate).getTime() -
                new Date(b.matchDate).getTime()
            )
            .map((match) => (
              <div
                key={match.matchID}
                className="flex justify-center items-center grow mx-auto"
              >
                <Card className="flex flex-col justify-between items-center w-[155px] h-full py-[6px] text-center   ">
                  <p className="text-[10px] uppercase font-medium text-center">
                    {new Date(match.matchDate).toLocaleDateString("es-EU", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex flex-row justify-between items-center text-center w-full px-[2px]">
                    <Image
                      src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                      alt="home"
                      width={48}
                      height={48}
                      style={{ objectFit: "contain" }}
                      className="h-7 "
                    />
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex">
                        <p className="font-semibold">{match.localScore}</p>
                        <p className="mx-1">-</p>
                        <p className="font-semibold">{match.visitorScore}</p>
                      </div>
                    </div>
                    <Image
                      src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                      alt="home"
                      width={48}
                      height={48}
                      style={{ objectFit: "contain" }}
                      className="h-7 "
                    />
                  </div>
                  <p className="text-[11px] uppercase font-medium text-center">
                    {new Date(match.matchDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </Card>
              </div>
            ))}
      </div>
      <Separator className=" mt-4" />
      {/* <pre className="text-center">
        {JSON.stringify(matches, null, 2)}
      </pre> */}
    </div>
  );
}
