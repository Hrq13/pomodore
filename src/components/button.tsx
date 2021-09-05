import React from 'react';

interface Props {
  onClick?: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
}

export function Button(props: Props): JSX.Element {
  function invokeOnClick() {
    if (props.onClick) {
      !props.disabled && props.onClick();
    }
  }

  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={invokeOnClick}
    >
      {props.text}
    </button>
  );
}
