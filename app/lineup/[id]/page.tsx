'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSquadById } from '@/database/client';
import Formation from '@/app/components/formations/Formation';

const Lineup = () => {
    const [selectedFormation, setSelectedFormation] = useState('');
    const [squadPlayers, setSquadPlayers] = useState([]);
    const [lineup, setLineup] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const fetchSquadData = async () => {
            const squadData = await getSquadById(id);
            if (squadData) {
                setSquadPlayers(squadData.playersIDS || []);
            }
        }
        fetchSquadData();
    }, [id]);

    const handleSelectFormation = (e) => {
        setSelectedFormation(e.target.value);
    };

    const handlePlayerAdd = (updatedLineup) => {
        setLineup(updatedLineup);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Football Squad Lineup</h1>
            <div className="flex justify-center">
                <div className="w-1/2 pr-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Select Formation</h2>
                        <select
                            value={selectedFormation}
                            onChange={handleSelectFormation}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Select Formation</option>
                            <option value="4-3-3">4-3-3</option>
                            <option value="4-4-2">4-4-2</option>
                            <option value="3-4-3">3-4-3</option>
                            <option value="4-2-4">4-2-4</option>
                        </select>
                    </div>
                    {selectedFormation && (
                        <Formation
                            formationName={selectedFormation}
                            onPlayerAdd={handlePlayerAdd}
                            squadPlayers={squadPlayers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lineup;
