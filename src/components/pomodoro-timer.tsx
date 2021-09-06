import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

import startSound from '../sounds/bell-start.mp3';
import finishSound from '../sounds/bell-finish.mp3';
import { secondsToTime } from '../utils/seconds-to-time';

const bellStart = new Audio(startSound);
const bellFinish = new Audio(finishSound);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  activity: string;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(props.activity);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(resetCycles());

  const [completedCyles, setCompletedCyles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  function resetCycles() {
    return new Array(props.cycles - 1).fill(true);
  }

  useInterval(
    (): void => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setMainTime(props.pomodoroTime);
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setCurrentActivity(props.activity);
    bellStart.play();
  }, [
    props.activity,
    props.pomodoroTime,
    bellStart,
    setMainTime,
    setTimeCounting,
    setWorking,
    setResting,
    setCurrentActivity,
  ]);
  const configureRest = useCallback(
    (long: boolean) => {
      setWorking(false);
      setResting(true);

      bellFinish.play();

      if (long) {
        setMainTime(props.longRestTime);
        setCurrentActivity('resting');
      } else {
        setMainTime(props.shortRestTime);
        setCurrentActivity('taking a short break');
      }
    },
    [setWorking, setResting, setMainTime, setCurrentActivity, bellFinish],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(resetCycles());
      setCompletedCyles(completedCyles + 1);
    }
    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCyles,
    configureRest,
    setCyclesQtdManager,
    setCompletedCyles,
    setNumberOfPomodoros,
    configureWork,
    resetCycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>You are {currentActivity}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text={'Work'}
          className={'btn btn-start ' + (working ? 'btn-disabled' : '')}
          disabled={working}
          onClick={() => configureWork()}
        />
        <Button
          text={'Rest'}
          className={'btn btn-stop ' + (resting ? 'btn-disabled' : '')}
          disabled={resting}
          onClick={() => configureRest(false)}
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          className={'btn btn-pause ' + (!working && !resting ? 'hidden' : '')}
          disabled={false}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Ciclos concluídos: {completedCyles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime, true)}</p>
        <p>Número de pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
