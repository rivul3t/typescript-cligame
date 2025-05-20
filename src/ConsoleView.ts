import * as readline from "readline";

export class ConsoleView {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  ask(prompt: string, callback: (input: string) => void) {
    this.rl.question(prompt, callback);
  }

  show(message: string) {
    console.log(message);
  }

  close() {
    this.rl.close();
  }
}
