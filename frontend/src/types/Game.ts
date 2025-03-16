import { Rule } from "./Rule";

export interface Game {
  gameId: number;
  name: string;
  author: string;
  rules: Rule[];
  rangeStart: number;
  rangeEnd: number;
}