export type Time = [number, number]

export type Day = 1|2|3|4|5|6|7

export interface TimeRange {
  start: Time,
  end: Time,
  days: Day[]
}

export interface TimeRangePreset {
  name: string,
  range: TimeRange
}


export function getDaysNameAndIndex(
  days: Day[]
): [string, number] {
  interface Presets {
    days: Day[]
    value: [string, number]
  }

  const presets: Presets[] = [
    { value: ['weekends',  0], days: [6,7] },
    { value: ['weekdays',  1], days: [1,2,3,4,5] },
    { value: ['any-day',   2], days: [1,2,3,4,5,6,7] },
    { value: ['monday',    3], days: [1] },
    { value: ['tuesday',   4], days: [2] },
    { value: ['wednesday', 5], days: [3] },
    { value: ['thursday',  6], days: [4] },
    { value: ['friday',    7], days: [5] },
    { value: ['saturday',  8], days: [6] },
    { value: ['sunday',    9], days: [7] },
  ]

  const sorted = (days || []).sort()
  const found = presets.find(x => arraysAreEqual(sorted, x.days))

  return found ? found.value : ['unknown', -1]
}

function arraysAreEqual(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}