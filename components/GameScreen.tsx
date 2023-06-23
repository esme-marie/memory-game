import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useReducer, useState } from "react";
import Timer from "@/components/Timer";
import GameResults from "@/components/GameResults";
import GameBoard from "@/components/GameBoard";
import Menu from "@/components/MenuButton";
import Multiplayer from "@/components/Multiplayer";
import { initializePlayerStats } from "@/helper-functions/helper-functions";
import { PlayerDataCollectionType, TimerType, GameResultType, GameModeType } from "@/types/types";
import styles from "@/styles/GameScreen.module.scss";
import stylesComp from "@/styles/Components.module.scss";

type State = GameResultType;
type Action = {
  type: String;
  movesNeeded?: number;
  timeNeeded?: TimerType;
  playerStats?: PlayerDataCollectionType;
  highScore?: number;
  numberOfPlayers?: number;
};

// Update game statistics
function gameResults(state: State, action: Action) {
  if (action.type === "movesNeeded" && action.movesNeeded) {
    return { ...state, movesNeeded: action.movesNeeded };
  } else if (action.type === "timeNeeded" && action.timeNeeded) {
    return { ...state, timeNeeded: action.timeNeeded };
  } else if (
    action.type === "initializePlayerStats" &&
    action.numberOfPlayers
  ) {
    return {
      ...state,
      playerStats: initializePlayerStats(action.numberOfPlayers),
    };
  } else if (
    action.type === "playerStats" &&
    action.playerStats &&
    action.highScore
  ) {
    return {
      ...state,
      playerStats: action.playerStats,
      highScore: action.highScore,
    };
  } else {
    return { ...state };
  }
}

type Props = GameModeType & {
  onStartNewGame: () => void;
};

const GameScreen: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { gameTheme, numberOfPlayers, gridSize, onStartNewGame } = props;
  const [gridKey, setGridKey] = useState<string>(`grid-key-${Date.now()}`);
  const [timerKey, setTimerKey] = useState<string>(`timer-key-${Date.now()}`);
  const [resultsKey, setResultsKey] = useState<string>(`results-key-${Date.now()}`);
  const [playerStatsKey, setPlayerStatsKey] = useState<string>(`player-stats-key-${Date.now()}`);
  const [gameStarted, setGameStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameTimedOut, setGameTimedOut] = useState(false);
  const [currentPlayerNumber, setCurrentPlayer] = useState(1);
  const [successfulPlayerNumber, setSuccessfulPlayer] = useState({ player: 0, time: 0 });
  const [movesNeeded, setMovesNeeded] = useState(0);
  const [gameResult, setGameResult] = useReducer(gameResults, {
    movesNeeded: 0,
    timeNeeded: { minutes: "0", seconds: "00" },
    playerStats: [],
    highScore: 0,
  });

  // Initialize player stats
  useEffect(() => {
    if (numberOfPlayers > 1) {
      setGameResult({
        type: "initializePlayerStats",
        numberOfPlayers: numberOfPlayers,
      });
    }
  }, [numberOfPlayers]);

  // Update game results
  useEffect(() => {
    if (gameCompleted && numberOfPlayers === 1) {
      setGameResult({
        type: "movesNeeded",
        movesNeeded: movesNeeded,
      });
    }
  }, [gameCompleted, numberOfPlayers, movesNeeded]);

  // Start game button
  const startGame = () => {
    setGameStarted(true);
  };
  // Menu button
  const openMenu = () => {
    setMenuOpened(true);
  };

  // Resume game button
  const resumeGame = () => {
    setMenuOpened(false);
  };

  // Start new game button
  const newGame = () => {
    onStartNewGame();
  };

  // Restart game button
  const restartGame = () => {
    // Reset to initial value
    setGameStarted(false);
    setMenuOpened(false);
    setGameCompleted(false);
    setMovesNeeded(0);
    setCurrentPlayer(1);
    setSuccessfulPlayer({ player: 0, time: 0 });
    // Update new key id to trigger re-rendering of components
    setGridKey(`grid-key-${Date.now()}`);
    setTimerKey(`timer-key-${Date.now()}`);
    setPlayerStatsKey(`player-stats-key-${Date.now()}`);
    setResultsKey(`results-key-${Date.now()}`);
  };

  // Upadate current player
  const updateCurrentPlayer = (playerNumber: number) => {
    setCurrentPlayer(playerNumber);
  };

  // Update number of moves
  const updateMovesNeeded = () => {
    setMovesNeeded((moves) => moves + 1);
  };

  // Update successful player with timestamp that will also trigger re-rendering
  const successfulGuess = (playerNumber: number) => {
    setSuccessfulPlayer({ player: playerNumber, time: Date.now() });
  };

  // Set game completed
  const finishGame = () => {
    setTimeout(() => {
      setGameCompleted(true);
    }, 600);
  };

  // Set game timed out
  const gameHasTimedOut = () => {
    setTimeout(() => {
      setGameTimedOut(true);
      setGameCompleted(true);
    }, 600);
  };

  // Update time taken to complete game
  const submitTimeNeeded = (timeNeeded: TimerType) => {
    setGameResult({
      type: "timeNeeded",
      timeNeeded: timeNeeded,
    });
  };

  // Update game results with players highest score
  const submitPlayerStats = (
    playerStats: PlayerDataCollectionType,
    highScore: number
  ) => {
    setGameResult({
      type: "playerStats",
      playerStats: playerStats,
      highScore: highScore,
    });
  };

  return (
    <main className={styles.game_screen}>
      <header className={styles.header_section}>
        <h1 className={styles.game_title}>memory</h1>

        {/* Header buttons hidden in mobile screens */}
        <div id={stylesComp.header_buttons} className={styles.control_buttons}>
          <button
            onClick={restartGame}
            className={`${stylesComp.orange_button} ${styles.reset_button}`}
            disabled={gameCompleted}
          >
            Restart
          </button>
          <button
            onClick={newGame}
            className={`${stylesComp.gray_button} ${styles.new_game_button}`}
          >
            New Game
          </button>
        </div>

        {/* Menu button only visible in mobile screens */}
        <button
          id={stylesComp.menu_button}
          onClick={openMenu}
          className={`${stylesComp.orange_button} ${styles.reset_button}`}
          disabled={gameCompleted}
          hidden
        >
          Menu
        </button>
      </header>

      <section className={styles.game_section}>
        <GameBoard
          key={gridKey}
          gameTheme={gameTheme}
          numberOfPlayers={numberOfPlayers}
          gridSize={gridSize}
          onGameStarted={startGame}
          onUpdateMoves={updateMovesNeeded}
          onUpdateCurrentPlayer={updateCurrentPlayer}
          onCorrectGuess={successfulGuess}
          onGameCompleted={finishGame}
        />

        {numberOfPlayers === 1 && (
          <div className="game-stats">
            <Timer
              key={timerKey}
              gameStarted={gameStarted}
              menuOpened={menuOpened}
              gameCompleted={gameCompleted}
              onGameTimedOut={gameHasTimedOut}
              onCompletedTime={submitTimeNeeded}
            />

            <div className="info-bar stat-bar">
              <h3 className="bar-label">Moves</h3>
              <h2 className="bar-value">{movesNeeded}</h2>
            </div>
          </div>
        )}

        {numberOfPlayers > 1 && (
          <div
            className={`game-stats multiplayer-stats total-players-${numberOfPlayers}`}
          >
            <Multiplayer
              key={playerStatsKey}
              numberOfPlayers={numberOfPlayers}
              currentPlayerNumber={currentPlayerNumber}
              successfulPlayer={successfulPlayerNumber}
              gameCompleted={gameCompleted}
              onSubmitPlayerStats={submitPlayerStats}
            />
          </div>
        )}

        {gameCompleted && (
          <GameResults
            key={resultsKey}
            numberOfPlayers={numberOfPlayers}
            gameTimedOut={gameTimedOut}
            movesNeeded={gameResult.movesNeeded}
            timeNeeded={gameResult.timeNeeded}
            playerStats={gameResult.playerStats}
            highScore={gameResult.highScore}
            onRestartGame={restartGame}
            onStartNewGame={newGame}
          />
        )}

        {menuOpened && !gameCompleted && (
          <Menu
            onRestartGame={restartGame}
            onStartNewGame={newGame}
            onResumeGame={resumeGame}
          />
        )}
      </section>
    </main>
  );
};

export default GameScreen;
