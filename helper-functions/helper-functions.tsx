import { PlayerDataCollectionType, TileType, TimerType } from "@/types/types";

// Array shuffle with Fisher-Yates Algorithm
export function shuffle(tiles: TileType[]) {
  for (let i = tiles.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  return tiles;
}

// Update timer function
export function updateTimer(timer: TimerType, startTime: number) {
  let currentMinutes: number = Number(timer.minutes);
  let currentSeconds: number = Number(timer.seconds);
  let updatedMinutes: string = timer.minutes;
  let updatedSeconds: string = timer.seconds;
  let updatedStartTime: number = 0;

  if (currentSeconds === 59) {
    updatedStartTime = Date.now(); // new timestamp
    updatedMinutes = (currentMinutes + 1).toString();
    currentSeconds = 0;
  } else {
	// calculatedSeconds = seconds gone by since start/resume of game
    const calculatedSeconds = Math.floor((Date.now() - startTime) / 1000);

	// Resume game will reset startTime to current timestamp & calculatedSeconds will be 0
	// If timer (currentSeconds) > 0, timer can simply continue by incrementing +1 second
    if (calculatedSeconds < currentSeconds) {
      currentSeconds = currentSeconds + 1;
    } else {
      currentSeconds = calculatedSeconds;
    }
  }

  // Add 0 in front of single digits, else seconds updated with current double digits
  if (currentSeconds < 10) {
    updatedSeconds = "0" + currentSeconds;
  } else {
    updatedSeconds = currentSeconds.toString();
  }

  return {
    minutes: updatedMinutes,
    seconds: updatedSeconds,
    startTime: updatedStartTime,
  };
}

// Initialize player data
export function initializePlayerStats(
  numberOfPlayers: number
): PlayerDataCollectionType {
  const playerDataCollection: PlayerDataCollectionType = [];
  for (let i = 1; i <= numberOfPlayers; i++) {
    playerDataCollection.push({
      playerNumber: i,
      label: "Player " + i,
      score: 0,
    });
  }

  return playerDataCollection;
}

// Create number tiles
export function createNumberTiles(value: number) {
  const numberTiles: TileType[] = [];
  for (let i = 1; i <= value; i++) {
    const tileData = {
      id: "number-tile-" + i,
      tile: <span>{i}</span>,
    };

    numberTiles.push(tileData);
  }

  return numberTiles;
}
