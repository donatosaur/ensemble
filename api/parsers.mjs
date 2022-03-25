
/**
 * @returns integer representation of string, or null if the string is not a number
 */
export function safeParseInt(string) {
  const parsedInt = Number.parseInt(string);
  return Number.isNaN(parsedInt) ? null : parsedInt;
}
