export abstract class GameState {
    public abstract getStateDescription(): string;
    public abstract getCommands(): Command[];
}

export interface Command {
    getCommandDescription(): string;
    execute(): void;
}

export interface StateData {
    id: string;
    description: string;
    actions: { description: string, nextStateId: string}[]
}