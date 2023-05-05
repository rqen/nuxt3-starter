// https://lodash.com/docs/4.17.15#round
export function round(number, precision = 2) {
  var pair = (number + 'e').split('e')
  var value = Math.round(pair[0] + 'e' + (+pair[1] + precision))
  pair = (value + 'e').split('e')
  return +(pair[0] + 'e' + (+pair[1] - precision))
}
