# ES6 "variant" of LiveScript

ES6 optimized version of LiveScript.

See

- [node-es6-examples](https://github.com/JustinDrake/node-es6-examples).
- [traceur language features](https://code.google.com/p/traceur-compiler/wiki/LanguageFeatures)

- generators
- block scoping (let)
- classes
- modules `export`, `import` `default`
- proxies `proxy`
- maps and sets

## generators

Using *generators* branch

Example:

```LiveScript

x = ->*
  yield 0
  yield 1
  yield 2
```

Compiles to:

```javascript

  var xGen;
  xGen = function*(){
    yield 0;
    yield 1;
    yield 2;
  };
```

For more see `es6/generators` test.

## block scoping

Default identifier declaration will be `let` instead of `var`. To force use of `var` it must be specified:

```LiveScript

x = 1
var x = 1
```


```javascript
var x;

let x = 1;
x = 1;
```

## Iterators and For Of Loops

`for (let element of [1, 2, 3])` conflicts with the `for ... of` syntax of LiveScript.

"`for ... of` loops iterate through an object. They have the structure: `for (own) (let) (KEY-VAR)(, VAL-VAR) of EXP (when COND)`"

`for (let element of [1, 2, 3])` could be written as: `for element @ [1, 2, 3])`

```LiveScript

for element @ [1, 2, 3]
  console.log element
```

```javascript

for (let element of [1, 2, 3]) {
  console.log(element);
}
```

## classes

LiveScript syntax remains the same, except compiles to new ES6 class syntax

```LiveScript
class Monster extends Character
  (x, y, name) ->
    super x, y
    @name = name
    @health_ = 100

  attack: (character) ->
    super character
  }

  get isAlive: ->
    @health > 0

  get health: ->
    @health

  set health: (value) ->
    throw new Error 'Health must be non-negative.' if value < 0
    @health_ = value
}
```

Compiles to:


```javascript
class Monster extends Character {
  constructor(x, y, name) {
    super(x, y);
    this.name = name;
    this.health_ = 100;
  }

  attack(character) {
    super.attack(character);
  }

  get isAlive() { return this.health > 0; }
  get health() { return this.health_; }
  set health(value) {
    if (value < 0) throw new Error('Health must be non-negative.');
    this.health_ = value;
  }
}
```

## modules

```LiveScript
module Profile
  # module code
  export firstName = 'David'
  export lastName = 'Belle'
  export year = 1973
}

module ProfileView
  import Profile {firstName, lastName, year}

  setHeader: (element) ->
    element.textContent = firstName + ' ' + lastName
  }
}

```

Compiles to:

```javascript
module Profile {
  // module code
  export var firstName = 'David';
  export var lastName = 'Belle';
  export var year = 1973;
}

module ProfileView {
  import Profile.{firstName, lastName, year};

  function setHeader(element) {
    element.textContent = firstName + ' ' + lastName;
  }
  // rest of module
}
```


## maps and sets

- Map `%{}`
- WeakMap `%{}%`

- Set `%[]`

```LiveScript
const gods = [
  * name: 'Brendan Eich'
  * name: 'Guido van Rossum'
]

miracles = %{}

miracles.set gods.0 \JavaScript
miracles.set gods.1 \Python'

pleasures = %[];
pleasures.add pleasure

```

Compiles to

```javascript
const gods = [
  {name: 'Brendan Eich'},
  {name: 'Guido van Rossum'},
];

let miracles = Map();

miracles.set(gods[0], 'JavaScript');
miracles.set(gods[1], 'Python');

let pleasures = Set();
pleasures.add(pleasure);
```

## symbols

- use Rubyish symbol syntax `:name`
- For explicit use of `Symbol()` function, use `:S`

```LiveScript

a = {}
:debugSymbol
a[:debugSymbol] = 'This property value is identified by a symbol'

a = %{}
a.set :S!, 'Noise'
testSymbol = :S 'This is a test'
```

Compiles to

```javascript
let a = {};
let debugSymbol = Symbol();

a[debugSymbol] = 'This property value is identified by a symbol';

let a = Map();
a.set(Symbol(), 'Noise');
let testSymbol = Symbol('This is a test');
```

## destructuring assignment

Is a nice way to assign or initialize several variables at once:

```LiveScript

[a, [b], c, d] = ['hello', [', ', 'junk'], ['world']]
```

Is already possible in LiveScript, just need to change compilation into new ES6 syntax...

```javascript

let [a, [b], c, d] = ['hello', [', ', 'junk'], ['world']];
```

It can also destructure objects:

```LiveScript

pt = x: 123, y: 444
rect = topLeft: {x: 1, y: 2}, bottomRight: {x: 3, y: 4}

{x, y} = pt # unpack the point
topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2} = rect
```


```javascript

let pt = {x: 123, y: 444};
let rect = {topLeft: {x: 1, y: 2}, bottomRight: {x: 3, y: 4}};
// ... other code ...
let {x, y} = pt; // unpack the point
let {topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2}} = rect;
```

## default parameters

Default parameters allow your functions to have optional arguments without needing to check arguments.length or check for undefined.

Already supported by LiveScript, simply change compilation to ES6 syntax ;)

```LiveScript

slice = (list, indexA = 0, indexB = list.length) ->
  # ...
```


```javascript

function slice(list, indexA = 0, indexB = list.length) {
  // ...
}
```

## rest parameters

Rest parameters allows your functions to have variable number of arguments without using the arguments object.

```LiveScript

push = (array, ...items) ->
  # ...
```

Already supported by LiveScript, simply change compilation to ES6 syntax ;)

```javascript

function push(array, ...items) {
  // ...
}
```

## spread operator

The spread operator is like the reverse of rest parameters. It allows you to expand an array into multiple formal parameters.

```LiveScript

array.push ...items
  # ...
```

Already supported by LiveScript, simply change compilation to ES6 syntax ;)

```javascript

array.push(...items);
```

## deferred functions

introduce `await` keyword.

```LiveScript

deferredAnimate (element) ->
  await deferredTimeout 20
```


```javascript
function deferredAnimate(element) {
  await deferredTimeout(20);
};
```

## Object.observe

[Object.observe](https://github.com/jdarling/Object.observe/blob/master/examples/js/Object.observe.test.js)


