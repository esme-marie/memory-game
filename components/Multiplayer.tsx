import type { NextComponentType, NextPageContext } from "next";
import { Fragment, useEffect, useLayoutEffect, useReducer, useState } from "react";
import { initializePlayerStats } from "@/helper-functions/helper-functions";
import { PlayerDataCollectionType } from "@/types/types";
import stylesComp from "@/styles/Components.module.scss"

type State = PlayerDataCollectionType;
type Action = {
  type: string;
  successfulPlayer: number;
  numberOfPlayers: number;
};

// Update successful player score
function playerStats(state: State, action: Action) {
  if (action.type === "initialize") {
    return initializePlayerStats(action.numberOfPlayers);
  } else {
    return state.map((playerData) => {
      if (action.successfulPlayer === playerData.playerNumber) {
        return { ...playerData, score: playerData.score + 1 };
      }
      return playerData;
    });
  }
}

interface Props {
  numberOfPlayers: number;
  currentPlayerNumber: number;
  successfulPlayer: { player: number; time: number };
  gameCompleted: boolean;
  onSubmitPlayerStats: (
    playerData: PlayerDataCollectionType,
    highScore: number
  ) => void;
}

const Multiplayer: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const {
    numberOfPlayers,
    currentPlayerNumber,
    successfulPlayer,
    gameCompleted,
    onSubmitPlayerStats,
  } = props;

  const [playerData, setPlayerData] = useReducer(playerStats, []);
  const [highScore, setHighScore] = useState(0);
  const [statsSubmitted, setStatsSubmitted] = useState(false);

  // Initialize players data 
  useLayoutEffect(() => {
    setPlayerData({
      type: "initialize",
      successfulPlayer: 0,
      numberOfPlayers: numberOfPlayers,
    });
  }, [numberOfPlayers]);

  // Update player statistics
  useEffect(() => {
    if (successfulPlayer.player) {
      setPlayerData({
        type: "update",
        successfulPlayer: successfulPlayer.player,
        numberOfPlayers: numberOfPlayers,
      });
    }
  }, [successfulPlayer, numberOfPlayers]);

  // Set player(s) highest score
  useEffect(() => {
    for (const player of playerData) {
      setHighScore((currentHigh) => Math.max(currentHigh, player.score));
    }
  }, [playerData]);

  // Submit players' statistics on game completed
  useEffect(() => {
    if (gameCompleted && !statsSubmitted) {
      onSubmitPlayerStats(playerData, highScore);
      setStatsSubmitted(true);
    }
  }, [
    gameCompleted,
    statsSubmitted,
    playerData,
    highScore,
    onSubmitPlayerStats,
  ]);

  return (
    <Fragment>
      {playerData.map((player) => (
        <div
          key={player.playerNumber}
          className={`stat-bar info-bar
            ${
              player.playerNumber === currentPlayerNumber
                ? "current-player"
                : ""
            }`}
        >
          <h3 id={stylesComp.s_player_label} className="bar-label" hidden>P{player.label.at(-1)}</h3>
          <h3 id={stylesComp.l_player_label} className="bar-label">{player.label}</h3>
          <h2 className="bar-value">{player.score}</h2>

          {player.playerNumber === currentPlayerNumber && (
            <span>Current Turn</span>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default Multiplayer;
