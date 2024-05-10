'use client'
import React, { useEffect, useState } from 'react';
import { createNewSquad, getAllPlayers, getAllUsers } from '@/database/client';
import { supabase } from '@/database/supabase';


export default function Squad() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [squadName, setSquadName] = useState('');
  const [error, setError] = useState('');
  
  const [session, setSession] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { allPlayers } = await getAllPlayers();
      setPlayers(allPlayers);
    };

    fetchPlayers();
  }, []);

  


  useEffect(() => {
    const data = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      setSession(session);
    });
    return () => {
      data.data.subscription.unsubscribe();
    };
  }, []);


  const addPlayer = player => {
    if (selectedPlayers.length < 26 && !selectedPlayers.some(p => p.playerID === player.playerID)) {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  const removePlayer = playerId => {
    setSelectedPlayers(prev => prev.filter(p => p.playerID !== playerId));
  };


 
  
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveSquad = async () => {
    if (!squadName) {
      setError('Squad name must be provided');
      return;
    }

    if (selectedPlayers.length === 0) {
      setError('At least one player must be selected');
      return;
    }

    setError('');

    const playerIDs = selectedPlayers.map(player => ({
      playerID: player.playerID,
    }));

    const newSquad = {
      squadName: squadName,
      playersIDS: playerIDs,
      email: session?.user?.email,
      
    };
      await createNewSquad(newSquad);
  
      setSquadName('');
      setSelectedPlayers([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Create a Squad</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="squadName" className="block text-sm font-medium text-black-300">
          Name
        </label>
        
        <input
          type="text"
          id="squadName"
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none text-white sm:text-sm"
          placeholder="Enter squad name"
          value={squadName}
          onChange={e => setSquadName(e.target.value)}
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
              key={player.playerID}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => addPlayer(player)}
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={saveSquad}
        type="button"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Save Changes
      </button>
      <div className="mt-4">
        <div className="text-sm font-medium text-black-300">You have selected {selectedPlayers.length} players out of a maximum of 26</div>
        
        <ul className="mt-2">
          {selectedPlayers.map(player => (
            <li key={player.playerID} className="flex justify-between items-center bg-gray-300 p-2 rounded-md mb-1">
              <div className="flex items-center flex-col">
                <img src={player.image} alt={player.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <div>
                  <div>{player.name}</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <img src='' alt='' style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div>{player.teamName}</div>
                </div>
              </div>
              <div className="flex items-center  gap-7 ">
                <div>{player.position}</div>
                <button onClick={() => removePlayer(player.playerID)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
