import type { NextComponentType, NextPageContext } from "next";
import React, { useRef } from "react";
import { GameModeOptionType } from "@/types/types";
import styles from "@/styles/StartScreen.module.scss";

type Props = GameModeOptionType & {
  onUpdateGameMode: (group: string, value: string) => void;
};

const SelectOptionButton: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { value, label, groupName, isChecked, onUpdateGameMode } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  // Update game options
  const updateGameMode = () => {
    onUpdateGameMode(groupName, value);
  };

  // To trigger input change
  const onInputChange = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className={styles.option_selector}>
      <input
        type="radio"
        name={groupName}
        value={value}
        checked={isChecked}
        ref={inputRef}
        onChange={updateGameMode}
      />

      <button
        onClick={(e) => onInputChange(e)}
        className={styles.option_button}
      >
        {label}
      </button>
    </div>
  );
};

export default SelectOptionButton;
