import { GameController } from './GameController';
import { ConsoleView } from './ConsoleView';
import { ForkState } from './states';  // Пример состояния
import { Command, StateData } from './types';

jest.mock('./ConsoleView');

describe('Game controller', () => {
    let states: Record<string, StateData>;
    let controller: GameController;
    let view: ConsoleView

    beforeEach(() => {
        states = {
            "ForkInTheForest": {
                "id": "ForkInTheForest",
                "description": "Вы просыпаетесь в центре густого леса, окруженного туманом. Единственный звук, который вы слышите, — это ветер, шелестящий в листве деревьев. Перед вами две тропинки. Одна ведет направо, другая — налево.",
                "actions": [
                  { "description": "Направо", "nextStateId": "Bridge" },
                  { "description": "Налево", "nextStateId": "House" }
                ]
              },
              "Bridge": {
                "id": "Bridge",
                "description": "Вы поворачиваете направо и идёте по узкой тропинке. Через некоторое время перед вами появляется старый мост, ведущий через бурную реку.",
                "actions": [
                  { "description": "Перейти через мост", "nextStateId": "BridgeEnd" },
                  { "description": "Вернуться назад", "nextStateId": "ForkInTheForest" }
                ]
              },
              "BridgeEnd": {
                  "id": "BridgeEnd",
                  "description": "Вы смело идёте по скрипящим доскам моста, но в середине пути слышите треск. Мост обрушивается под вами, и вы падаете в холодную воду реки. Вы теряете сознание...",
                  "actions": []
                }
        };

        view = new ConsoleView();
        controller = new GameController(view, states, "ForkInTheForest");
    });

    it('should be Bridge state id when move right', () => {
        view.ask.mockImplementationOnce((prompt: string, callback: (input: string) => void) => {
            callback('1');
        });

        controller.start();

        expect(controller.getState().getStateId()).toBe('Bridge');
    })

    it('should be right state description', () => {
        view.ask.mockImplementationOnce((prompt: string, callback: (input: string) => void) => {
            callback('1');
        });

        controller.start();

        expect(controller.getState().getStateDescription).toBe('Bridge');
    })

    it('should show error message for invalid input', () => {
        view.ask.mockImplementationOnce((prompt: string, callback: (input: string) => void) => {
            callback('3');
        });

        controller.start();

        expect(view.show).toHaveBeenCalledWith("Неправильный ввод. Напиши число, которое стоит перед нужным действием");
    });

    it('should display all available commands for the current state', () => {
        view.ask.mockImplementationOnce((prompt: string, callback: (input: string) => void) => {
            callback('1');
        });

        controller.start();
        
        expect(view.show).toHaveBeenCalledWith('1 - Пойти направо');
        expect(view.show).toHaveBeenCalledWith('2 - Пойти налево');
    });
})