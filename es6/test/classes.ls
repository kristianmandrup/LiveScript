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
