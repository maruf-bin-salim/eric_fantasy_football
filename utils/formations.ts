// utils/formations.ts

// Define a data structure for formations and positions
const formations = [
    {
        id: 1,
        name: '4-3-3',
        positions: [
            { id: 1, role: 'Goalkeeper', x: 48, y: 92 },
            { id: 2, role: 'Defender1', x: 10, y: 75 },
            { id: 3, role: 'Defender2', x: 35, y: 78 },
            { id: 4, role: 'Defender3', x: 60, y: 78 },
            { id: 5, role: 'Defender4', x: 86, y: 75 },
            { id: 6, role: 'Midfielder1', x: 48, y: 48 },
            { id: 7, role: 'Midfielder2', x: 22, y: 48 },
            { id: 8, role: 'Midfielder3', x: 70, y: 48 },
            { id: 9, role: 'Forward1', x: 10, y: 22 },
            { id: 10, role: 'Forward2', x: 48, y: 22 },
            { id: 11, role: 'Forward3', x: 86, y: 22 }
        ]
    },
    {
        id: 2,
        name: '4-4-2',
        positions: [
            { id: 1, role: 'Goalkeeper', x: 48, y: 92 },
            { id: 2, role: 'Defender1', x: 10, y: 75 },
            { id: 3, role: 'Defender2', x: 35, y: 78 },
            { id: 4, role: 'Defender3', x: 60, y: 78 },
            { id: 5, role: 'Defender4', x: 86, y: 75 },
            { id: 6, role: 'Midfielder1', x: 8, y: 48 },
            { id: 7, role: 'Midfielder2', x: 35, y: 50 },
            { id: 8, role: 'Midfielder3', x: 60, y: 50 },
            { id: 9, role: 'Midfielder4', x: 88, y: 48 },
            { id: 10, role: 'Forward1', x: 35, y: 16 },
            { id: 11, role: 'Forward2', x: 60, y: 16 },
        ]
    },
    {
        id: 3,
        name: "3-4-3",
        positions: [
            { id: 1, role: "Goalkeeper", x: 48, y: 92 },
            { id: 2, role: "Defender1", x: 20, y: 75 },
            { id: 3, role: "Defender2", x: 48, y: 75 },
            { id: 4, role: "Defender3", x: 75, y: 75 },
            { id: 5, role: 'Midfielder1', x: 8, y: 48 },
            { id: 6, role: 'Midfielder2', x: 35, y: 50 },
            { id: 7, role: 'Midfielder3', x: 60, y: 50 },
            { id: 8, role: 'Midfielder4', x: 88, y: 48 },
            { id: 9, role: 'Forward1', x: 10, y: 22 },
            { id: 10, role: 'Forward2', x: 48, y: 20 },
            { id: 11, role: 'Forward3', x: 86, y: 22 }
        ]
    },
    {
        id: 4,
        name: "4-2-4",
        positions: [
            { id: 1, role: "Goalkeeper", x: 48, y: 92 },
            { id: 2, role: 'Defender1', x: 10, y: 75 },
            { id: 3, role: 'Defender2', x: 35, y: 78 },
            { id: 4, role: 'Defender3', x: 60, y: 78 },
            { id: 5, role: 'Defender4', x: 86, y: 75 },
            { id: 6, role: 'Midfielder1', x: 31, y: 48 },
            { id: 7, role: 'Midfielder2', x: 64, y: 48 },
            { id: 8, role: 'Forward1', x: 10, y: 23 },
            { id: 9, role: 'Forward2', x: 35, y: 20 },
            { id: 10, role: 'Forward3', x: 60, y: 20 },
            { id: 11, role: 'Forward4', x: 86, y: 23 }
        ]
    },


];

// Function to retrieve positions for a specific formation
const getPositionsForFormation = (formationName: string) => {
    const formation = formations.find(form => form.name === formationName);
    return formation ? formation.positions : [];
};

export { formations, getPositionsForFormation };
