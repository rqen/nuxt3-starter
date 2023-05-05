import { intlFormat, format, parse } from 'date-fns'

export function isRunningNow(dateFrom, dateTo) {
  // COMMENT: Date from and to are strings, of day, month and year (expected string format: "12 okt 2022")

  if (dateFrom && dateTo) {
    const monthNamesDa = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']

    const fromSplit = dateFrom.split(' ')
    const toSplit = dateTo.split(' ')

    if (fromSplit.length < 3 || toSplit.length < 3) return false // COMMENT: Return false on incorrected data

    const dayFrom = fromSplit[0].indexOf('.') > -1 ? fromSplit[0].replace('.', '') : fromSplit[0]
    const dayTo = toSplit[0].indexOf('.') > -1 ? toSplit[0].replace('.', '') : toSplit[0]
    const monthFrom = monthNamesDa.indexOf(fromSplit[1].toLowerCase()) + 1
    const monthTo = monthNamesDa.indexOf(toSplit[1].toLowerCase()) + 1

    const yearFrom = fromSplit[2]
    const yearTo = toSplit[2]

    const from = new Date(`${yearFrom}/${monthFrom}/${dayFrom}`)
    const to = new Date(`${yearTo}/${monthTo}/${dayTo}`)
    const currentDate = new Date().setHours(0, 0, 0, 0)

    // COMMENT: Return boolean
    return from.valueOf() < currentDate.valueOf() && to.valueOf() > currentDate.valueOf()
  }
  return false
}

export const rafThrottle = (fn) => {
  let ticking = false

  return (...props) => {
    if (!ticking) {
      window.requestAnimationFrame((timestamp) => {
        fn(...props, timestamp)
        ticking = false
      })

      ticking = true
    }
  }
}

// export function nextTick(fn) {
//   return setTimeout(fn, 0)
// }

export function once(fn) {
  const f = function (...args) {
    if (f.called) return f.value
    f.called = true
    return (f.value = fn.apply(this, args))
  }
  f.called = false
  return f
}

export const forceRepaint = (el) => {
  // change of style forces repaint
  el.style.clipPath = 'unset'
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight // flushes style changes within one frame.
  el.style.clipPath = ''
}

export const debounce = (callback, wait, immediate = false) => {
  let timeout = null

  return function (...args) {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, args)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }
  }
}

export const asyncDebounce = (callback, wait) => {
  let timeout = null
  let resolves = []

  return function (...args) {
    const next = () => callback.apply(this, args)

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      const result = next()
      resolves.forEach((r) => r(result))
      resolves = []
    }, wait)

    return new Promise((r) => resolves.push(r))
  }
}
