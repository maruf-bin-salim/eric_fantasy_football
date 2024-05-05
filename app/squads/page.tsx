'use client'
import { getAllPlayers } from '@/database/client';
import React, { useEffect, useState } from 'react';

export default function Squad({ }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const { allPlayers } = await getAllPlayers();
      setPlayers(allPlayers);
    };

    fetchPlayers();
  }, []);

  const addPlayer = player => {
    if (selectedPlayers.length < 26 && !selectedPlayers.some(p => p.playerID === player.playerID)) {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };


  const removePlayer = playerId => {
    setSelectedPlayers(prev => {
      const newPlayers = prev.filter(p => p.playerID !== playerId);
      return newPlayers;
    });
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Create a Squad</h1>
      <div>
        <label htmlFor="squadName" className="block text-sm font-medium text-black-300">
          Name
        </label>
        <input
          type="text"
          id="squadName"
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none text-white sm:text-sm"
          placeholder="Enter squad name"
        />
      </div>
      <div>
        <label htmlFor="searchPlayer" className="block text-sm font-medium text-black-300">
          Player
        </label>
        <input
          type="text"
          id="searchPlayer"
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none text-white sm:text-sm"
          placeholder="Search players"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="max-h-60 overflow-auto">
          {filteredPlayers.map(player => (
            <li
              key={player.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => addPlayer(player)}

            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
      >
        Save Changes
      </button>
      <div className="mt-4">
        <div className="text-sm font-medium text-black-300">You have selected {selectedPlayers.length} players out of a maximum of 26</div>
        <ul className="mt-2">
          {selectedPlayers.map(player => (
            <li key={player.playerID} className="flex justify-between text-black items-center bg-gray-300 p-2 rounded-md mb-1">
              <div>
                <img src={player.image} alt={player.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                {player.name} - {player.teamName} {player.position} -
              </div>
              <button onClick={() => removePlayer(player.playerID)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
