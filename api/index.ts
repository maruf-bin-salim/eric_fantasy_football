

// const options:apiOptions =  {
//   next: { revalidate: 30 },
//   headers: {
//     "X-Auth-Token": process.env.SPORTMONKS_API_TOKEN,
//     "Content-Type": "application/json",
//   },
// }
// export const getMatchesfootball = async () => {
//   const matchData = await fetch('https://api.sportmonks.com/v3/football/livescores/inplay?${process.env.SPORTMONKS_API_TOKEN}')
//   return matchData.json()
// }

// const todayDate = new Date()
// const getDateMonth = new Date(todayDate.getTime());
// getDateMonth.setDate(todayDate.getDate() - 1);
// const year = getDateMonth.getFullYear()
// const month = String(getDateMonth.getMonth() + 1).padStart(2, '0');
// const day = String(getDateMonth.getDate()).padStart(2, '0');

// const yesterday = [year, month, day].join('-');
  
// export const getMatchesfootballFinished = async () => {
//   const matchData = await fetch(`https://api.football-data.org/v4/matches?date=${yesterday}`,options)
//   return matchData.json()
// }

// export const getNewsInfo = async () => {
//   const newsData = await fetch(`https://newsapi.org/v2/everything?apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`,{next:{revalidate:30}})
//   return newsData.json()
// }

// export const filterLeague = async (filterData:string) => {
//   const getEnglishLeague = await getMatchesfootball()
//   const filterPremierLeague:matchesType[] = getEnglishLeague?.matches
//   const getData = filterPremierLeague.filter((item) => item.competition.name === filterData)
//   return getData
// }


export async function getLiveMatches() {
  try {
    // Using backticks for template literal
    const response = await fetch(`https://api.sportmonks.com/v3/football/fixtures/18849962?api_token=${process.env.SPORTMONKS_API_TOKEN}&include=scores;events;lineups`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const liveMatches = await response.json();
    return liveMatches;
  } catch (error) {
    console.error('Failed to fetch live matches:', error);
    return null; // or handle the error as you see fit
  }
}

// export async function getLiveMatchesUseHook() {
//   try {
//     // Using backticks for template literal
//     const response = await fetch(`https://api.sportmonks.com/v3/football/fixtures/18849962?api_token=${process.env.SPORTMONKS_API_TOKEN}&include=scores;events;lineups`);
    
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const liveMatches = await response.json();
//     return liveMatches;
//   } catch (error) {
//     console.error('Failed to fetch live matches:', error);
//     return null; // or handle the error as you see fit
//   }
// }

