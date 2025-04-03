type Style = 'bold' | 'italic' | number

let font: Style;

font = "dfdf"

interface Person {
  first: string,
  last: string
  // [key: string]: any
}

const person: Person = {
  first: 'Jeff',
  last: 'Delaney'
}

const person2: Person = {
  first: 'Usain',
  last: 'Bolt',
  fast: true,
}

function pow(x:number, y:number): string {
  return Math.pow(x, y).toString();
}

pow(1, "df")

type MyList = [number?, string?, boolean?]
const arr: MyList = []

arr.push(1)
arr.push('df')

class Observable<T> {
  constructor(public value: T) {}
}

let x: Observable<number>

let y: Observable<Person>

let z = new Observable(23)