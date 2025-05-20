import { ConsoleView } from "./ConsoleView";
import { ForkState } from "./states";
import { GameState, StateData } from "./types";

export class GameController {
  private gameState: GameState;

  constructor(
    private view: ConsoleView,
    private states: Record<string, StateData>,
    gameStateId: string,
  ) {
    this.gameState = new ForkState(this.states[gameStateId], this);
  }

  public start() {
    this.handleCurrentState();
  }

  public transitionTo(gameStateId: string) {
    this.gameState = new ForkState(this.states[gameStateId], this);
    this.handleCurrentState();
  }

  private handleCurrentState() {
    const commands = this.gameState.getCommands();

    this.view.show(this.gameState.getStateDescription());
    commands.forEach((command, idx) => {
      this.view.show(`${idx + 1} - ${command.getCommandDescription()}`);
    });

    if (commands.length == 0) {
      this.view.show("Конец игры.");
    } else {
      this.view.ask("> ", (input) => this.handleUserInput(input));
    }
  }

  private handleUserInput(message: string) {
    const commands = this.gameState.getCommands();
    const commandAmount = this.gameState.getCommands().length;
    const commandNumber = parseInt(message);

    if (
      isNaN(commandNumber) ||
      commandNumber <= 0 ||
      commandNumber > commandAmount
    ) {
      this.view.show(
        "Неправильный ввод. Напиши число, которое стоит перед нужным действием",
      );
      this.handleCurrentState();
      return;
    }

    commands[commandNumber - 1].execute();
  }

  public getState() {
    return this.gameState;
  }
}
