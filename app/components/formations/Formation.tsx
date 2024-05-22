'use client'
import React, { useEffect, useState } from 'react';
import { getPositionsForFormation } from '@/utils/formations';
import { getAllPlayers, getSquadById, updateSquad } from '@/database/client';

const Formation = ({ formationName, squadID, onPlayerAdd, squadPlayers, selectedPlayer, setSelectedPlayer }) => {
    const positions = getPositionsForFormation(formationName);
    const [lineup, setLineup] = useState({});
    const [players, setPlayers] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingClear, setLoadingClear] = useState(false);

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
        const fetchLineup = async () => {
            const { lineup, error } = await getSquadById(squadID);
            if (lineup) {
                setLineup(lineup);
            }
        };
        fetchLineup();
        fetchPlayers();
    }, [squadID]);

    const getPlayerById = (id) => {
        return players.find(player => player.playerID === id) || { name: '', image: '', position: '' };
    };

    const handlePlayerClick = (positionId) => {
        setSelectedPosition(positionId);
        setSelectedPlayer(squadPlayers[positionId]?.playerID);
    };

    const handlePlayerSelection = (playerId) => {
        const playerToAdd = getPlayerById(playerId);
        const selectedPositionRole = translatePosition(positions[selectedPosition]?.role);

        if (playerToAdd && selectedPosition !== null && positions[selectedPosition]) {
            const playerPositionRole = translatePosition(playerToAdd.position);

            if (playerPositionRole === selectedPositionRole) {
                const updatedLineup = {
                    ...lineup,
                    [selectedPosition]: playerToAdd
                };
                const playerToRemovePosition = Object.keys(lineup).find(key => lineup[key].position === selectedPositionRole);
                if (playerToRemovePosition) {
                    delete updatedLineup[playerToRemovePosition];
                }
                setLineup(updatedLineup);
                onPlayerAdd(updatedLineup);
                setSelectedPlayer(null);
                setSelectedPosition(null);
            } else {
                alert(`Player's position does not match the role required for this position: ${selectedPositionRole}`);
            }
        }
    };

    const saveChanges = async (lineup) => {
        setLoadingSave(true);
        await updateSquad(squadID, { lineup });
        alert('Lineup updated successfully!');
        setLoadingSave(false);

    };

    const clearLineup = async () => {
        setLoadingClear(true);
        setLineup({});
        await updateSquad(squadID, { lineup: {} });
        alert('Lineup cleared successfully!');
        setLoadingClear(false);

    };

    return (
        <div>
            <div>
                <h1>{lineup.squadName}</h1>
            </div>
            <div className='flex gap-8 px-10 mb-5'>
                <button onClick={() => saveChanges(lineup)} className={`px-4 py-2 rounded-md ${loadingSave ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`} disabled={loadingSave}>
                    {loadingSave ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => clearLineup()} className={`px-4 py-2 rounded-md ${loadingClear ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white`} disabled={loadingClear}>
                    {loadingClear ? 'Deleting...' : 'Delete Lineup'}
                </button>
            </div>
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
                                    <div className="relative transform right-2 bottom-2">
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
        </div>
    );
};

export default Formation;
