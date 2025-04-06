import { LetterState } from '#shared/utils/letter'

import { describe, expect, it } from 'vitest'
import { compareWord } from '~~/server/utils/task'

describe('compareWord', () => {
  it('marks all letters correct', () => {
    const result = compareWord('apple', 'apple')
    expect(result.map(l => l.state)).toEqual([
      LetterState.Correct,
      LetterState.Correct,
      LetterState.Correct,
      LetterState.Correct,
      LetterState.Correct,
    ])
  })

  it('marks all letters absent', () => {
    const result = compareWord('zzzzz', 'apple')
    expect(result.map(l => l.state)).toEqual([
      LetterState.Absent,
      LetterState.Absent,
      LetterState.Absent,
      LetterState.Absent,
      LetterState.Absent,
    ])
  })

  it('marks some letters correct and present', () => {
    const result = compareWord('pleap', 'apple')
    expect(result.map(l => l.state)).toEqual([
      LetterState.Present, // p
      LetterState.Present, // l
      LetterState.Present, // e
      LetterState.Present, // a
      LetterState.Present, // p (only 2 p's in "apple", but okay here due to order)
    ])
  })

  it('handles duplicate letters correctly', () => {
    const result = compareWord('ppppp', 'apple')
    expect(result.map(l => l.state)).toEqual([
      LetterState.Absent, // p
      LetterState.Correct, // p
      LetterState.Correct, // p
      LetterState.Absent, // p
      LetterState.Absent, // p
    ])
  })

  it('mixes correct, present, and absent', () => {
    const result = compareWord('paper', 'apple')
    expect(result.map(l => l.state)).toEqual([
      LetterState.Present, // p
      LetterState.Present, // a
      LetterState.Correct, // p
      LetterState.Present, // e
      LetterState.Absent, // r
    ])
  })
})
