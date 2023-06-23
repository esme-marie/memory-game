import Head from "next/head";
import { useState } from "react";
import StartScreen from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import { GameModeType } from "@/types/types";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("start-screen");
  const [gameMode, setGameMode] = useState<GameModeType>({
    gameTheme: "numbers",
    numberOfPlayers: 1,
    gridSize: 4,
  });

  const enterGameScreen = (savedGameMode: GameModeType) => {
    setGameMode({
      gameTheme: savedGameMode.gameTheme,
      numberOfPlayers: savedGameMode.numberOfPlayers,
      gridSize: savedGameMode.gridSize,
    });

    setCurrentScreen("game-screen");
  };

  const startNewGame = () => {
    setCurrentScreen("start-screen");
  };

  return (
    <>
      <Head>
        <title>Memory Game</title>
        <meta name="description" content="Apex Memory Game Assesment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/apex-logo.svg" />
      </Head>
      <main>
        {currentScreen === "start-screen" && (
          <StartScreen onEnterGameScreen={enterGameScreen} />
        )}

        {currentScreen === "game-screen" && (
          <GameScreen
            gameTheme={gameMode.gameTheme}
            numberOfPlayers={gameMode.numberOfPlayers}
            gridSize={gameMode.gridSize}
            onStartNewGame={startNewGame}
          />
        )}
      </main>
    </>
  );
}
