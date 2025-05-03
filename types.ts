class GameController {
    private gameState: GameState;

    constructor(gameState: GameState) {
        this.transitionTo(gameState);
    }

    public transitionTo(gameState: GameState) {
        console.log(`Game: Transition to ${(<any>gameState).constructor.name}.`);
        this.gameState = gameState;
        this.gameState.setGameContext(this);
    }

}

abstract class GameState {
    protected game: GameController;
    protected actions: Command[];
    protected sceneDescription: string;

    public setGameContext(game: GameController) {
        this.game = game;
    }

    public abstract handleInput(): void;

}

interface Command {
    execute(): void;
}