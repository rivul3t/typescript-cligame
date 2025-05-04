import { StateData } from "./types";
import { ConsoleView } from "./ConsoleView";
import { readFileSync } from 'fs';
import { GameController } from "./gameController";

const states: Record<string, StateData> = JSON.parse(readFileSync('./src/states.json', 'utf-8'));
const game = new GameController(new ConsoleView, states, "ForkInTheForest");

game.start();