import type { NextComponentType, NextPageContext } from "next";
import { Fragment, useLayoutEffect, useState } from "react";
import { GameResultType } from "@/types/types";
import styles from "@/styles/GameResults.module.scss";
import stylesComp from "@/styles/Components.module.scss";

type Props = GameResultType & {
  gameTimedOut: boolean;
  numberOfPlayers: number;
  onStartNewGame: () => void;
  onRestartGame: () => void;
};

const GameResults: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const {
    gameTimedOut,
    numberOfPlayers,
    movesNeeded,
    timeNeeded,
    playerStats,
    highScore,
    onStartNewGame,
    onRestartGame,
  } = props;
  const [resultHeading, setResultHeading] = useState("Game Results");

  // Update game results
  useLayoutEffect(() => {
    const highScoringPlayers: string[] = [];

    for (const player of playerStats) {
      if (player.score === highScore) {
        highScoringPlayers.push(player.label);
      }
    }

    if (highScoringPlayers.length === 1) {
      setResultHeading(`${highScoringPlayers[0]} Wins!`);
    } else {
      setResultHeading("It's a tie!");
    }
  }, [highScore, playerStats]);

  // Restart game button
  const restartGame = () => {
    onRestartGame();
  };

  // Start new game button
  const startNewGame = () => {
    onStartNewGame();
  };

  return (
    <div className={stylesComp.overlay}>
      <div className={styles.game_result_card}>
        {/* Solo player results */}
        {numberOfPlayers === 1 && (
          <Fragment>
            {gameTimedOut && (
              <Fragment>
                <h1 className={styles.card_heading}>Time is up!</h1>
                <p className={styles.card_description}>Try again?</p>
              </Fragment>
            )}

            {!gameTimedOut && (
              <Fragment>
                <h1 className={styles.card_heading}>You did it!</h1>
                <p className={styles.card_description}>
                  Game over! Here&apos;s how you got on...
                </p>
              </Fragment>
            )}

            <div className={styles.result_bars}>
              <div className={`${styles.result_bar} info-bar`}>
                <h3 className="bar-label">Time Elapsed</h3>
                <h2 className="bar-value">
                  {timeNeeded.minutes}:{timeNeeded.seconds}
                </h2>
              </div>

              <div className={`${styles.result_bar} info-bar`}>
                <h3 className="bar-label">Moves taken</h3>
                <h2 className="bar-value">{movesNeeded} Moves</h2>
              </div>
            </div>
          </Fragment>
        )}

        {/* Multiplayer results */}
        {numberOfPlayers > 1 && (
          <Fragment>
            <h1 className={styles.card_heading}>{resultHeading}</h1>
            <p className={styles.card_description}>
              Game over! Here are the results...
            </p>

            <div className={styles.result_bars}>
              {playerStats.map((player) => (
                <div
                  key={player.playerNumber}
                  className={`${styles.result_bar} info-bar 
                        ${player.score === highScore ? styles.winner : ""}`}
                >
                  <h3 className={styles.bar_label}>
                    {player.label}
                    {player.score === highScore && " (Winner!)"}
                  </h3>

                  <h2 className={styles.bar_value}>
                    {player.score} {player.score <= 1 ? "Pair" : "Pairs"}
                  </h2>
                </div>
              ))}
            </div>
          </Fragment>
        )}

        <div className={styles.control_buttons}>
          <button onClick={restartGame} className={stylesComp.orange_button}>
            Restart
          </button>
          <button onClick={startNewGame} className={stylesComp.gray_button}>
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
