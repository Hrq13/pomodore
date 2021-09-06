export function leftZero(seconds: number): string {
  return seconds.toString().padStart(2, '0');
}
