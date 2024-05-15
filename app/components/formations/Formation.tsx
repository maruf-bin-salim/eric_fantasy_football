'use client'
import React, { useEffect, useState } from 'react';
import { getPositionsForFormation } from '@/utils/formations';
import { getAllPlayers } from '@/database/client';

const Formation = ({ formationName, onPlayerAdd, squadPlayers, selectedPlayer, setSelectedPlayer }) => {
    const positions = getPositionsForFormation(formationName);
    const [players, setPlayers] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null); // Track selected position
    const [lineup, setLineup] = useState({}); // Define lineup state

    const positionTranslations = {
        "Portero": "Goalkeeper",
        "Lateral izquierdo": "Left back",
        "Lateral derecho": "Right back",
        "Central": "Center back",
        "Defensa": "Defender",
        "Centrocampista": "Midfielder",
        "Delantero": "Forward",
        "Delantero centro": "Striker",
        "Extremo": "Winger",
    };

    const translatePosition = (spanishPosition) => {
        return positionTranslations[spanishPosition] || spanishPosition;
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            const { allPlayers } = await getAllPlayers();
            setPlayers(allPlayers);
        };

        fetchPlayers();
    }, []);

    function getPlayerById(id) {
        return players?.find(player => player.playerID === id);
    }

    const handlePlayerClick = (positionId) => {
        setSelectedPosition(positionId); // Track selected position
    };

    const handlePlayerSelection = (playerId) => {
        const playerToAdd = getPlayerById(playerId);
        if (playerToAdd && selectedPosition !== null && positions[selectedPosition]) {
            const updatedLineup = {
                ...lineup,
                [selectedPosition]: playerToAdd
            };
            onPlayerAdd(updatedLineup);
            setSelectedPlayer(null); // Clear selected player after adding
            setSelectedPosition(null); // Clear selected position after adding
        }
    };

    console.log("selectedPlayers", selectedPlayer);


    return (
        <div className="flex items-center">
            <div className="football-field-container" style={{ position: 'relative', width: '400px', height: '600px' }}>
                <img src="/FieldLineup.png" alt="Football Field" className="absolute inset-0 w-full h-full object-cover" />
                {positions.map((position, index) => (
                    <div
                        key={index}
                        className="position-marker absolute"
                        style={{ left: `${position?.x}%`, top: `${position?.y}%` }}
                        onClick={() => handlePlayerClick(index)}
                    >
                        <span role="img" aria-label="Position Marker" className="text-purple-500">🟣</span>
                        <button onClick={() => setSelectedPlayer(index)} className="text-white absolute top-0 left-0 w-full h-full bg-transparent">+</button>
                    </div>
                ))}
                {selectedPlayer !== null && selectedPosition !== null && positions[selectedPosition] && (
                    <div
                        className="selected-player-indicator"
                        style={{ left: `${positions[selectedPosition].x}%`, top: `${positions[selectedPosition].y}%` }}
                    >
                        <img src={getPlayerById(selectedPlayer)?.image} alt="Selected Player" />
                        <span>{getPlayerById(selectedPlayer)?.name}</span>
                    </div>
                )}
            </div>

            {selectedPlayer !== null && (
                <div className="max-h-96 ml-12 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {squadPlayers.map(player => (
                            <li key={player.playerID} className="py-4 flex items-center space-x-4">
                                <img src={getPlayerById(player.playerID)?.image} className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{getPlayerById(player.playerID)?.name}</span>
                                    <span className="text-sm text-gray-500">{getPlayerById(player.playerID)?.teamName}</span>
                                    <span className="text-sm text-gray-500">{translatePosition(getPlayerById(player.playerID)?.position)}</span>
                                </div>

                                <button onClick={() => handlePlayerSelection(player.playerID)} className="text-white bg-blue-500 px-2 py-1 rounded-md">Select</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Formation;
