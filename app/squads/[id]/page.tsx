'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getAllPlayers, getSquadById, updateSquad } from '@/database/client';
import { supabase } from '@/database/supabase';

const SquadPage = () => {
  const { id } = useParams();

  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [squadName, setSquadName] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);
  const [squadPlayers, setSquadPlayers] = useState([]);
  const [fetch, setFetch] = useState(false);


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


  useEffect(() => {
    const fetchSquadData = async () => {

      const squadData = await getSquadById(id);
      if (squadData) {
        setSquadName(squadData.squadName);
        setSquadPlayers(squadData.playersIDS || []);
      }
    }
    if (id) {
      fetchSquadData();
    }
  }, [id, fetch]);
  

  function getPlayerById(id) {
    return players?.find(player => player.playerID === id);
  }


  const addPlayer = player => {
    if (selectedPlayers.length < 26 && !selectedPlayers.some(p => p.playerID === player.playerID)) {
      setSquadPlayers(prev => [...prev, player]);
    }
  };

  const removePlayer = playerId => {
    setSquadPlayers(prev => prev.filter(p => p.playerID !== playerId));
  };


  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveSquad = async () => {

    if (!squadName) {
      setError('Squad name must be provided');
      return;
    }

    if (squadPlayers.length === 0) {
      setError('At least one player must be selected');
      return;
    }

    setError('');

    const playerIDs = squadPlayers.map(player => ({
      playerID: player.playerID,
      
    }));

    
    await updateSquad(id,squadName,playerIDs);
    setFetch(fetch => !fetch);

  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Edit Squad</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="squadName" className="block text-sm font-medium text-black-300">
          Name
        </label>

        <input
          type="text"
          id="squadName"
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none text-white sm:text-sm"
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
        Update Changes
      </button>
      <div className="mt-4">
        <div className="text-sm font-medium text-black-300">You have selected {squadPlayers.length} players out of a maximum of 26</div>
        <ul className="mt-2">
          {squadPlayers.map(player => (
            <li key={player.playerID} className="flex justify-between items-center bg-gray-300 p-2 rounded-md mb-1">
              <div className="flex items-center flex-col">
                <img src={getPlayerById(player.playerID)?.image} alt={player.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <div>
                  <div>{getPlayerById(player.playerID)?.name}</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <img src={getPlayerById(player.playerID)?.teamID} alt={player.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div>{getPlayerById(player.playerID)?.teamName}</div>
                </div>
              </div>
              <div className="flex items-center  gap-7 ">
                <div>{getPlayerById(player.playerID)?.position}</div>
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
};

export default SquadPage;
