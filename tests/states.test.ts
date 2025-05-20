import { GameController } from "../src/gameController";
import { ConsoleView } from "../src/ConsoleView";
import { ForkState } from "../src/states";
import { Command, StateData } from "../src/types";

jest.mock("../src/ConsoleView");

describe("Game controller", () => {
  let states: Record<string, StateData>;
  let controller: GameController;
  let view: ConsoleView;

  beforeEach(() => {
    states = {
      ForkInTheForest: {
        id: "ForkInTheForest",
        description:
          "Вы просыпаетесь в центре густого леса, окруженного туманом. Единственный звук, который вы слышите, — это ветер, шелестящий в листве деревьев. Перед вами две тропинки. Одна ведет направо, другая — налево.",
        actions: [
          { description: "Пойти направо", nextStateId: "Bridge" },
          { description: "Пойти налево", nextStateId: "House" },
        ],
      },
      Bridge: {
        id: "Bridge",
        description:
          "Вы поворачиваете направо и идёте по узкой тропинке. Через некоторое время перед вами появляется старый мост, ведущий через бурную реку.",
        actions: [
          { description: "Перейти через мост", nextStateId: "BridgeEnd" },
          { description: "Вернуться назад", nextStateId: "ForkInTheForest" },
        ],
      },
      BridgeEnd: {
        id: "BridgeEnd",
        description:
          "Вы смело идёте по скрипящим доскам моста, но в середине пути слышите треск. Мост обрушивается под вами, и вы падаете в холодную воду реки. Вы теряете сознание...",
        actions: [],
      },
    };

    view = new ConsoleView();
    controller = new GameController(view, states, "ForkInTheForest");
  });

  it("should be Bridge state id when move right", () => {
    view.ask = jest
      .fn()
      .mockImplementationOnce(
        (prompt: string, callback: (input: string) => void) => {
          callback("1");
        },
      );

    controller.start();

    expect(controller.getState().getStateId()).toBe("Bridge");
  });

  it("should be right state description", () => {
    view.ask = jest
      .fn()
      .mockImplementationOnce(
        (prompt: string, callback: (input: string) => void) => {
          callback("1");
        },
      );

    controller.start();

    expect(controller.getState().getStateDescription()).toBe(
      "Вы поворачиваете направо и идёте по узкой тропинке. Через некоторое время перед вами появляется старый мост, ведущий через бурную реку.",
    );
  });

  it("should show error message for invalid input", () => {
    view.ask = jest
      .fn()
      .mockImplementationOnce(
        (prompt: string, callback: (input: string) => void) => {
          callback("3");
        },
      );

    controller.start();

    expect(view.show).toHaveBeenCalledWith(
      "Неправильный ввод. Напиши число, которое стоит перед нужным действием",
    );
  });

  it("should display all available commands for the current state", () => {
    view.ask = jest
      .fn()
      .mockImplementationOnce(
        (prompt: string, callback: (input: string) => void) => {
          callback("1");
        },
      );

    controller.start();

    expect(view.show).toHaveBeenCalledWith(
      "Вы просыпаетесь в центре густого леса, окруженного туманом. Единственный звук, который вы слышите, — это ветер, шелестящий в листве деревьев. Перед вами две тропинки. Одна ведет направо, другая — налево.",
    );
    expect(view.show).toHaveBeenCalledWith("1 - Пойти направо");
    expect(view.show).toHaveBeenCalledWith("2 - Пойти налево");
  });
});
