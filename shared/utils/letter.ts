export enum LetterState {
  Correct = 3,
  Present = 2,
  Absent = 1,
  Undefined = 0,
}

export class Letter {
  letter: string
  state: LetterState

  constructor(letter: string, state: LetterState) {
    this.letter = letter
    this.state = state
  }
}
