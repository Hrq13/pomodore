import React from 'react';

interface Props {
  onClick?: () => void;
  text: string;
  className?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
