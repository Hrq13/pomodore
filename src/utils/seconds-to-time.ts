export function secondsToTime(seconds: number): string {
  const leftZero = (n: number) => {
    return n.toString().padStart(2, '0');
  };
  const min = Math.floor((seconds / 60) % 60);
  const _seconds = seconds % 60;
  return `${leftZero(min)}:${leftZero(_seconds)}s`;
}
