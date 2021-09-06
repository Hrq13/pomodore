import { leftZero } from './left-zero';

export function secondsToTime(seconds: number, useShortForm: boolean): string {
  const hours = Math.floor(seconds / (60 * 60));
  const min = Math.floor((seconds / 60) % 60);
  const _seconds = seconds % 60;

  if (useShortForm) return `${leftZero(hours)}h${leftZero(min)}min`;
  return `${leftZero(hours)}:${leftZero(min)}:${leftZero(_seconds)}`;
}
