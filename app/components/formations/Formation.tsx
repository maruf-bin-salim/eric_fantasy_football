'use client'
import React, { useEffect, useState } from 'react';
import { getPositionsForFormation } from '@/utils/formations';
import { getAllPlayers } from '@/database/client';

const Formation = ({ formationName, onPlayerAdd, squadPlayers, selectedPlayer, setSelectedPlayer }) => {
    const positions = getPositionsForFormation(formationName);
    const [players, setPlayers] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null); 
    const [lineup, setLineup] = useState({}); 

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
        const player = players?.find(player => player.playerID === id);
        return player ? player : { name: '', image: '', position: '' }; 
    }

    const handlePlayerClick = (positionId) => {
        setSelectedPosition(positionId); 
        setSelectedPlayer(squadPlayers[positionId]?.playerID);
    };

    const handlePlayerSelection = (playerId) => {
        const playerToAdd = getPlayerById(playerId);
        const positionRole = translatePosition(positions[selectedPosition]?.role);
        if (playerToAdd && selectedPosition !== null && positions[selectedPosition]) {
            // Check if the player's position matches the position role
            if (translatePosition(playerToAdd.position) === positionRole) {
                // Check if the player is already in the lineup
                const isPlayerAlreadyInLineup = Object.values(lineup).some(player => player.playerID === playerId);
                if (!isPlayerAlreadyInLineup) {
                    const updatedLineup = {
                        ...lineup,
                        [selectedPosition]: playerToAdd
                    };
                    setLineup(updatedLineup);
                    onPlayerAdd(updatedLineup);
                    setSelectedPlayer(null); 
                    setSelectedPosition(null); 
                } else {
                    alert('Player is already in the lineup at another position');
                }
            } else {
                alert(`Player's position does not match the role required for this position: ${positionRole}`);
            }
        }
    };

    return (
        <div className="flex items-center relative">
            <div className="football-field-container relative" style={{ width: '400px', height: '600px' }}>
                <img src="/FieldLineup.png" alt="Football Field" className="absolute inset-0 w-full h-full object-cover" />
                <div className="position-absolute top-0 left-0 w-full h-full z-10">
                    {positions.map((position, index) => (
                        <div
                            key={index}
                            className="position-marker absolute"
                            style={{ left: `${position?.x}%`, top: `${position?.y}%` }}
                            onClick={() => handlePlayerClick(index)}
                        >
                            {lineup[index] ? (
                                <div className="relative trasnform right-2 bottom-2">
                                    <img src={lineup[index]?.image} alt="Selected Player" className="w-10 h-10 rounded-full" />
                                    <span className='text-white text-sm absolute top-full left-1/2 transform -translate-x-1/2'>{getPlayerById(lineup[index].playerID)?.name.split(' ')[0]}</span> 
                                </div>
                            ) : (
                                <>
                                    <span role="img" aria-label="Position Marker" className="text-purple-500">🟣</span>
                                    <button onClick={() => setSelectedPlayer(index)} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">+</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedPlayer !== null && (
                <div className="max-h-96 ml-12 overflow-y-auto absolute top-0 right-0">
                    <ul className="divide-y divide-gray-200">
                        {squadPlayers.map(player => (
                            <li key={player.playerID} className="py-4 flex items-center space-x-4">
                                <img src={getPlayerById(player.playerID)?.image} className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{getPlayerById(player.playerID)?.name.split(' ')[0]}</span> 
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
