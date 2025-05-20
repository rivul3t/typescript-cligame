import { TransitionCommand } from "./commands";
import { GameState, Command, StateData } from "./types";
import { GameController } from "./gameController";

export class ForkState extends GameState {
  private commands: Command[];
  private stateId: string;
  private description: string;

  constructor(stateData: StateData, controller: GameController) {
    super();
    this.stateId = stateData.id;
    this.description = stateData.description;
    this.commands = stateData.actions.map(
      (action) =>
        new TransitionCommand(
          controller,
          action.nextStateId,
          action.description,
        ),
    );
  }

  public getStateDescription(): string {
    return this.description;
  }

  public getCommands(): Command[] {
    return this.commands;
  }

  public getStateId(): string {
    return this.stateId;
  }
}
