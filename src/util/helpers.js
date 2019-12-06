export const formatLabel = (label) => label.replace(/([a-z\d])([A-Z])/g, '$1 $2')
.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
.toLowerCase()

export const formatDate = (value) => value.replace(/(.*)-(.*)-(.*)/, '$2/$3/$1')

export const formatCurrency = (value) => `$${value.toLocaleString()}`

export const metersToMiles = (value) => Number(value/1609.344).toFixed(2)
