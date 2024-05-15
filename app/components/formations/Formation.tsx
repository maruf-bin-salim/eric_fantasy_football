import { getAllPlayers } from '@/database/client';
import { getPositionsForFormation } from '@/utils/formations';
import React, { useEffect, useState } from 'react';

const Formation = ({ formationName, onPlayerAdd, squadPlayers }) => {
    const positions = getPositionsForFormation(formationName);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [players, setPlayers] = useState([]);

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
        if (selectedPlayer) {
            const playerToAdd = getPlayerById(selectedPlayer);
            if (playerToAdd) {
                const updatedLineup = {
                    ...lineup,
                    [positionId]: playerToAdd
                };
                onPlayerAdd(updatedLineup);
                setSelectedPlayer(null);
            }
        }
    };

    


    return (
        <div className="flex items-center">
            <div className="football-field-container" style={{ position: 'relative', width: '400px', height: '600px' }}>
                <img src="/FieldLineup.png" alt="Football Field" className="absolute inset-0 w-full h-full object-cover" />
                {positions.map(position => (
                    <div
                        key={position.id}
                        className="position-marker absolute"
                        style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        onClick={() => handlePlayerClick(position.id)}
                    >
                        <span role="img" aria-label="Position Marker" className="text-purple-500">🟣</span>
                        <button onClick={() => handlePlayerClick(position.id)} className="text-white absolute top-0 left-0 w-full h-full bg-transparent">+</button>

                    </div>
                ))}
            </div>

            {selectedPlayer && (
                <div className="max-h-96 ml-8 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {squadPlayers.map(player => (
                            <li key={player.playerID} className="py-4 flex items-center space-x-4">
                                <img src={getPlayerById(player.playerID)?.image} className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{getPlayerById(player.playerID)?.name}</span>
                                    <span className="text-sm text-gray-500">{getPlayerById(player.playerID)?.teamName}</span>
                                    <span className="text-sm text-gray-500">{translatePosition(getPlayerById(player.playerID)?.position)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Formation;
