a = {}
:debugSymbol
a[:debugSymbol] = 'This property value is identified by a symbol'

a = %{}
a.set :S!, 'Noise'
testSymbol = :S 'This is a test'
