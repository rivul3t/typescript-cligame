import { GameState, Command } from "./types";
import { GameController } from "./gameController";

export class TransitionCommand implements Command {
  private description: string;
  private controller: GameController;
  private nextStateId: string;

  constructor(
    controller: GameController,
    nextStateId: string,
    description: string,
  ) {
    this.controller = controller;
    this.nextStateId = nextStateId;
    this.description = description;
  }

  public getCommandDescription(): string {
    return this.description;
  }

  public execute(): void {
    this.controller.transitionTo(this.nextStateId);
  }
}
