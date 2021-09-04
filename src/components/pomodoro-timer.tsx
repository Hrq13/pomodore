import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  activity: string;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);

  useInterval((): void => {
    setMainTime(mainTime + 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are {props.activity}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text={'Start'}
          className="btn btn-start"
          onClick={() => console.log('Clicked Start')}
        />
        <Button
          text={'Stop'}
          className="btn btn-stop"
          onClick={() => console.log('Clicked Stop')}
        />
        <Button
          text={'Reset'}
          className="btn btn-reset"
          onClick={() => console.log('Clicked Reset')}
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
