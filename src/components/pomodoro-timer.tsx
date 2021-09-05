import React from 'react';
import { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

import startSound from '../sounds/bell-start.mp3';
import finishSound from '../sounds/bell-finish.mp3';

const bellStart = new Audio(startSound);
const bellFinish = new Audio(finishSound);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  activity: string;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [currentActivity, setCurrentActivity] = React.useState(props.activity);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    else document.body.classList.remove('working');
  }, [working]);

  useInterval(
    (): void => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setCurrentActivity(props.activity);
    bellStart.play();
  };
  const configureRest = (long: boolean) => {
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
  };

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
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    </div>
  );
}
