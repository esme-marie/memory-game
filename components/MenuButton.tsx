import type { NextComponentType, NextPageContext } from "next";
import styles from "@/styles/MenuButton.module.scss";
import stylesComp from "@/styles/Components.module.scss";

interface Props {
  onResumeGame: () => void;
  onRestartGame: () => void;
  onStartNewGame: () => void;
}

const MenuButton: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { onRestartGame, onStartNewGame, onResumeGame } = props;

  const restartGame = () => {
    onRestartGame();
  };

  const startNewGame = () => {
    onStartNewGame();
  };

  const resumeGame = () => {
    onResumeGame();
  };

  return (
    <div className={stylesComp.overlay}>
      <div className={styles.menu_card}>
        <button onClick={restartGame} className={stylesComp.orange_button}>
          Restart
        </button>
        <button onClick={startNewGame} className={stylesComp.gray_button}>
          New Game
        </button>
        <button onClick={resumeGame} className={stylesComp.gray_button}>
          Resume Game
        </button>
      </div>
    </div>
  );
};

export default MenuButton;
