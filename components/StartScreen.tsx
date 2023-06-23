import type { NextComponentType, NextPageContext } from "next";
import React, { useReducer } from "react";
import { gameConfig } from "@/data/data";
import { GameModeType } from "@/types/types";
import SelectOption from "@/components/SelectOptionButton";
import styles from "@/styles/StartScreen.module.scss";
import stylesComp from "@/styles/Components.module.scss";


type State = {
  gameTheme: string;
  numberOfPlayers: number;
  gridSize: number;
};

type Action = {
  type: string;
  gameTheme?: string;
  numberOfPlayers?: string;
  gridSize?: string;
};

// Update game mode
const gameMode = (state: State, action: Action) => {
  if (action.type === "gameTheme" && action.gameTheme) {
    return { ...state, gameTheme: action.gameTheme };
  } else if (action.type === "numberOfPlayers" && action.numberOfPlayers) {
    return { ...state, numberOfPlayers: Number(action.numberOfPlayers) };
  } else if (action.type === "gridSize" && action.gridSize) {
    return { ...state, gridSize: action.gridSize === "four" ? 4 : 6 };
  } else {
    return { ...state };
  }
};

interface Props {
  onEnterGameScreen: (gameMode: GameModeType) => void;
}

const StartScreen: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const [currentGameMode, setCurrentGameMode] = useReducer(gameMode, {
    gameTheme: "numbers",
    numberOfPlayers: 1,
    gridSize: 4,
  });

  // Set current game mode
  const updateGameMode = (groupName: string, value: string) => {
    setCurrentGameMode({
      type: groupName,
      [groupName as keyof Action]: value,
    });
  };

  // Update game options
  const optionSelected = (groupName: string, value: string) => {
    if (groupName === "numberOfPlayers") {
      return currentGameMode[groupName as keyof State] === Number(value);
    } else if (groupName === "gridSize") {
      return (
        currentGameMode[groupName as keyof State] === (value === "four" ? 4 : 6)
      );
    } else {
      return currentGameMode[groupName as keyof State] === value;
    }
  };

  // Start game button
  const enterGameScreen = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onEnterGameScreen(currentGameMode);
  };

  return (
    <main className={styles.start_screen}>
      <h1 className={styles.start_title}>memory</h1>
      <form className={styles.game_menu}>
        {gameConfig.map((gameConfigGroup) => (
          <div
            key={gameConfigGroup.title}
            className={`${styles.option_group}
                  ${
                    gameConfigGroup.options.length === 2
                      ? styles.options_two
                      : styles.options_four
                  }`}
          >
            <h3 className={styles.group_title}>{gameConfigGroup.title}</h3>

            {gameConfigGroup.options.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                label={option.label}
                groupName={option.groupName}
                isChecked={optionSelected(option.groupName, option.value)}
                onUpdateGameMode={updateGameMode}
              />
            ))}
          </div>
        ))}

        <button
          onClick={(e) => enterGameScreen(e)}
          className={stylesComp.orange_button}
        >
          Start Game
        </button>
      </form>
    </main>
  );
};

export default StartScreen;
