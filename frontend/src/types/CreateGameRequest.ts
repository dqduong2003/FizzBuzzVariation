import { Rule } from "./Rule";

export interface CreateGameRequest {
  name: string;
  author: string;
  rules: Rule[];
  rangeStart: number;
  rangeEnd: number;
}