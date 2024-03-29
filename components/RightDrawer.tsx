import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllMatches } from "@/database/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


type Props = {
  open: boolean;
  onClose: () => void;
};

const teamsSlugsByID = [
  { id: 21, slug: "d-alaves" },
  { id: 1, slug: "ud-almeria" },
  { id: 3, slug: "athletic-club" },
  { id: 2, slug: "atletico-de-madrid" },
  { id: 4, slug: "fc-barcelona" },
  { id: 5, slug: "real-betis" },
  { id: 162, slug: "cadiz-cf" },
  { id: 6, slug: "rc-celta" },
  { id: 9, slug: "getafe-cf" },
  { id: 28, slug: "girona-fc" },
  { id: 10, slug: "granada-cf" },
  { id: 31, slug: "ud-las-palmas" },
  { id: 33, slug: "rcd-mallorca" },
  { id: 13, slug: "c-a-osasuna" },
  { id: 14, slug: "rayo-vallecano" },
  { id: 15, slug: "real-madrid" },
  { id: 16, slug: "real-sociedad" },
  { id: 17, slug: "sevilla-fc" },
  { id: 18, slug: "valencia-cf" },
  { id: 20, slug: "villarreal-cf" },
];

function slugById(playerID) {
  const team = teamsSlugsByID.find((team) => team.id === playerID);

  const slug = team ? team.slug : "Not Wrong Found";

  return slug;
}

const RightDrawer = (props: Props) => {
  const { open, onClose } = props;
  const [matches, setMatches] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1); // Initial selected week
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { allMatches: matchesData } = await getAllMatches();

        if (matchesData) {
          setMatches(matchesData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        // Handle error, show a message, etc.
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && matches.length > 0) {
      const currentWeek = getCurrentWeek(matches);
      setSelectedWeek(currentWeek);
    }
  }, [loading, matches]);

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => Math.max(1, prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => Math.min(38, prevWeek + 1));
  };

  const getCurrentWeek = (matchesData) => {
    const today = new Date();

    for (const match of matchesData) {
      const matchDate = new Date(match.matchDate);

      const formattedMatchDate = new Date(matchDate.toISOString());

      if (
        today >= formattedMatchDate &&
        today <= new Date(formattedMatchDate).setHours(23, 59, 59)
      ) {
        return match.week;
      }

      const allMatchesForWeek = matchesData.filter(
        (m) => m.week === match.week
      );
      const allMatchesFinished = allMatchesForWeek.every(
        (m) => m.matchState === 7
      );

      if (allMatchesFinished) {
        const nextWeek = match.week + 1;
        return nextWeek;
      }
    }

    console.log("No matching week found, defaulting to week 1");
    return 1;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!matches || matches.length === 0) {
    return <p>No matches available.</p>;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* <pre className="">{JSON.stringify(matches, null, 2)}</pre> */}
      <Paper
        elevation={24}
        className="flex flex-col justify-start items-center w-[350px] p-4 h-full overflow-y-auto "
      >
        <div className="flex flex-row justify-start items-center w-full">
          <IconButton
            size="large"
            sx={{
              boxShadow: 3,
              borderRadius: 1,
              padding: 0,
            }}
            className={`w-12 h-12`}
            onClick={onClose}
          >
            <KeyboardTabIcon />
          </IconButton>
          <p className="text-xl font-semibold ml-12">PARTIDOS</p>
        </div>

        <div className="flex justify-between items-center m-auto my-4 gap-4">
          <IconButton onClick={handlePrevWeek}>
            <ChevronLeftIcon />
          </IconButton>

          <Select value={selectedWeek} onChange={handleWeekChange}>
            {Array.from({ length: 38 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {`Week ${index + 1}`}
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={handleNextWeek}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mx-auto">
          {/* Display matches for the selected week */}
          {matches
            .filter((match) => match.week === selectedWeek)
            .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
            .map((match) => (
              <div key={match.matchID}>
                <Paper
                  elevation={2}
                  className="flex flex-col justify-between items-center w-[150px] h-full py-1 text-center"
                >
                  <p className="text-[11px]">
                    {new Date(match.matchDate).toLocaleDateString("es-EU", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex flex-row justify-between items-center text-center">
                    <Image
                      src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                      alt="home"
                      width={48}
                      height={48}
                      style={{ objectFit: "contain" }}
                      className="h-7 mr-3"
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
                      className="h-7 ml-3"
                    />
                  </div>
                  <p className="text-[11px]">
                    {new Date(match.matchDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </Paper>
              </div>
            ))}
        </div>
    
      </Paper>
    </Drawer>
  );
};

export default RightDrawer;
