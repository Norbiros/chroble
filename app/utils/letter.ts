export enum LetterState {
  Correct = 'correct',
  Present = 'present',
  Absent = 'absent',
  Undefined = 'undefined',
}

export class Letter {
  letter: string
  state: LetterState

  constructor(letter: string, state: LetterState) {
    this.letter = letter
    this.state = state
  }
}
