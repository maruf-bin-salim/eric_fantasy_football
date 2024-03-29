import Image from "next/image";
import { getColor, slugById } from "@/utils/utils";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DoNotStepIcon from "@mui/icons-material/DoNotStep";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import SignalCellularNoSimIcon from "@mui/icons-material/SignalCellularNoSim";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import BackHandIcon from "@mui/icons-material/BackHand";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import PhonelinkEraseRoundedIcon from "@mui/icons-material/PhonelinkEraseRounded";
import FontDownloadRoundedIcon from "@mui/icons-material/FontDownloadRounded";
import HdrAutoRoundedIcon from "@mui/icons-material/HdrAutoRounded";
import HdrAutoTwoToneIcon from "@mui/icons-material/HdrAutoTwoTone";
import StyleIcon from "@mui/icons-material/Style";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function MatchesStats({
  matchesData,
  playerData,
  playerStat,
}: {
  matchesData: matches[];
  playerData: players;
  playerStat: stats[];
}) {
  const renderPerformanceIcons = (matchWeek: number, matchState: number) => {
    const stat = playerStat.find((s) => s.week === matchWeek);

    if (matchState === 7 && !stat) {
      return (
        <div className="flex justify-between items-center w-full">
          <div
          key={`separator1-${matchWeek}`}
          className="mx-1 h-5 border-l flex-initial border-neutral-400"
        ></div>
          <TimerOffOutlinedIcon color="action" fontSize="inherit" className=" ml-1	" />
          <p className="text-sm italic flex-grow text-right text-gray-600">No participó</p>
        </div>
      );
    }

    // If the match is not finished or there are stats, return icons
    const icons = [];
    if (stat) {
      icons.push(
        <div
          key={`separator1-${matchWeek}`}
          className="mx-1 h-5 border-l border-neutral-400"
        ></div>
      );
      icons.push(
        <div
          key={`mins-played-${matchWeek}`}
          className="flex items-center mr-auto text-sm"
        >
          <WatchLaterOutlinedIcon color="action" fontSize="inherit" />
          <span className="ml-1">
            <span className="font-semibold text-xs ">
              {stat.mins_played[0]}
            </span>
            '
          </span>
        </div>
      );

      for (let i = 0; i < stat.goals[0]; i++) {
        icons.push(
          <SportsSoccerIcon
            // color="success"
            className="text-neutral-100 bg-green-600 rounded-full"
            fontSize="small"
            key={`goal-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.goal_assist[0]; i++) {
        icons.push(
          <FontDownloadRoundedIcon
            color="primary"
            // className="text-green-600"
            fontSize="small"
            key={`assist-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.penalty_failed[0]; i++) {
        icons.push(
          <CancelPresentationOutlinedIcon
            color="error"
            fontSize="small"
            key={`penalty-failed-${matchWeek}-${i}`}
          />
        );
      }

      for (let i = 0; i < stat.yellow_card[0]; i++) {
        icons.push(
          <RectangleRoundedIcon
            className="text-yellow-400 -rotate-90"
            color="inherit"
            fontSize="small"
            key={`yellow-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.second_yellow_card[0]; i++) {
        icons.push(
          <div className="flex relative" key={`secondyellow-${matchWeek}-${i}`}>
            <RectangleRoundedIcon
              className="text-yellow-400 z-40 absolute right-2 -rotate-90"
              color="inherit"
              fontSize="small"
            />
            <RectangleRoundedIcon
              className="text-red-600 z-50 -rotate-90"
              color="inherit"
              fontSize="small"
            />
          </div>
        );
      }
      for (let i = 0; i < stat.red_card[0]; i++) {
        icons.push(
          <RectangleRoundedIcon
            className="text-red-600 -rotate-90"
            color="inherit"
            fontSize="small"
            key={`redcard-${matchWeek}-${i}`}
          />
        );
      }

      for (let i = 0; i < stat.penalty_save[0]; i++) {
        icons.push(
          <div
            key={`penalty-save-${matchWeek}-${i}`}
            className="flex justify-center items-center text-sm border px-1"
          >
            <span className="w-3">
              <span className="font-semibold text-xs ">
                {stat.penalty_save[0]}
              </span>
              <span className="text-[11px] text-neutral-500">-</span>
            </span>
            <PhonelinkEraseRoundedIcon
              className="-rotate-90"
              color="action"
              fontSize="small"
            />
          </div>
        );
      }

      if (stat.saves && playerData.positionID === 1) {
        icons.push(
          <div
            key={`saves-${matchWeek}`}
            className="flex justify-center items-center text-sm border px-1"
          >
            <span className="mx-1 w-2">
              <span className="font-semibold text-xs ">{stat.saves[0]}</span>
              <span className="text-[11px] text-neutral-500"></span>
            </span>
            <SportsHandballIcon color="action" fontSize="small" />
          </div>
        );
      }

      icons.push(
        <div
          key={`separator2-${matchWeek}`}
          className="mx-2 h-5 border-l border-neutral-400"
        ></div>
      );

      icons.push(
        <div
          key={`total-points-${matchWeek}`}
          className={`text-center border-[0.5px] w-5 h-5 border-neutral-700 rounded-xs flex justify-center items-center ${getColor(
            stat.totalPoints
          )}`}
        >
          <p className={`text-[12px] items-center align-middle`}>
            {stat.totalPoints}
          </p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="flex justify-end items-center w-full gap-1">
          {icons}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Card className="flex flex-col justify-start items-start p-2 w-full  ">
      <h3 className="font-bold text-xl mx-auto">Partidos</h3>
      {/* <pre>{JSON.stringify(matchesData, null, 2)}</pre> */}
      <ul className="list-none w-full flex flex-col justify-start items-start">
        {matchesData.map((match) => (
          <React.Fragment key={match.matchID}>
            <li className="w-full flex flex-row justify-start items-center">
              <div className="flex flex-col">

              <p className="text-[10px] uppercase font-semibold text-center whitespace-nowrap	w-8">
                J-{match.week}
              </p>
              <span className="text-[8px] uppercase font-medium text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
              </div>

              <div className="flex flex-col justify-between items-center w-[80px] py-[6px] text-center rounded-md mx-1">
                <div className="flex flex-row justify-between items-center text-center w-full ">
                  <div className="w-5 flex justify-center items-center">
                    <Image
                      src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                      alt="home"
                      width={20}
                      height={20}
                      style={{ objectFit: "contain" }}
                      className="h-5 "
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs w-2">{match.localScore}</p>
                    <p className="mx-1 text-xs w-1">-</p>
                    <p className="font-semibold text-xs w-2">
                      {match.visitorScore}
                    </p>
                  </div>

                  <div className="w-5 flex justify-center items-center">
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                    className="h-5 "
                  />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end flex-grow">
                {renderPerformanceIcons(match.week, match.matchState)}
              </div>
            </li>
            {match.week < matchesData.length && (
              <Separator className="w-full" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </Card>
  );
}
