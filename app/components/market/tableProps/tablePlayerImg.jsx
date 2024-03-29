import Image from "next/image";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";
import HelpIcon from "@mui/icons-material/Help";

export default (props) => {
  const player = props.value;
  const playerImage = player.playerID;
  const isPlayerInjured = player.status === "injured";
  const isPlayerSuspended = player.status === "suspended";
  const isPlayerDoubtful = player.status === "doubtful";

  return (
    <div className="flex justify-start items-start ">
      {/* <Image
        className=""
        src={`/playerImages/${playerImage}.png`}
        alt="Player"
        width={35}
        height={35}
      /> */}
      <div className="flex flex-col justify-start items-center flex-shrink-0 h-9 p-0 m-0 overflow-hidden">
        <Image
          src={player.image}
          alt={player.nickname}
          width={36}
          height={36}
          style={{ objectFit: "contain" }}
        />
      </div>
      {isPlayerInjured && (
        <LocalHospitalIcon fontSize="inherit" className="-ml-2 text-base text-red-500" />
      )}
      {isPlayerSuspended && (
        <RectangleRoundedIcon
          className="-ml-2 text-red-500 -rotate-90 text-base"
          color="inherit"
          fontSize="inherit"
        />
      )}
      {isPlayerDoubtful && (
        <HelpIcon
          className="-ml-2 text-base text-yellow-500"
          color="inherit"
          fontSize="inherit"
        />
      )}
    </div>
  );
};
