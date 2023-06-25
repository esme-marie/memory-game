import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { TimerType } from "@/types/types";
import { updateTimer } from "@/helper-functions/helper-functions";

interface Props {
  gameStarted: boolean;
  menuOpened: boolean;
  gameCompleted: boolean;
  onGameTimedOut: () => void;
  onCompletedTime: (timeNeeded: TimerType) => void;
}

const Timer: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  const {
    gameStarted,
    menuOpened,
    gameCompleted,
    onGameTimedOut,
    onCompletedTime,
  } = props;

  const [timer, setTimer] = useState<TimerType>({ minutes: "0", seconds: "00", });
  const [timerId, setTimerId] = useState<NodeJS.Timer>();

  // Set and update timer
  useEffect(() => {
    let startTime = Date.now();
    if (gameStarted && !gameCompleted && !menuOpened) {
      const timerInterval = setInterval(() => {
        setTimer((timer) => {
          const updatedValues = updateTimer(timer, startTime);

          if (updatedValues.startTime) {
            startTime = updatedValues.startTime;
          }

          return {
            minutes: updatedValues.minutes,
            seconds: updatedValues.seconds,
          };
        });
      }, 1000);

      setTimerId(timerInterval);
    }
  }, [gameStarted, menuOpened, gameCompleted]);

  // When menu is open, the timer is paused
  useEffect(() => {
    if (menuOpened) {
      clearInterval(timerId);
    }
  }, [menuOpened, timerId]);

  // When the game is completed
  useEffect(() => {
    if (gameCompleted && timerId) {
      clearInterval(timerId);
      setTimerId(undefined);
      onCompletedTime(timer);
    }
  }, [gameCompleted, timerId, timer, onCompletedTime]);

  // Set 5 minutes game timed out
  useEffect(() => {
    if (Number(timer.minutes) === 5) {
      onGameTimedOut();
    }
  }, [timer.minutes, onGameTimedOut]);

  return (
    <div className="info-bar stat-bar">
      <h3 className="bar-label">Time</h3>
      <h2 className="bar-value">
        {timer.minutes}:{timer.seconds}
      </h2>
    </div>
  );
};

export default Timer;
