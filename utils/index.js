export const isMobile = process.client
  ? window.matchMedia('(max-width: 1023px)').matches
  : false

export const isMobileBurger = process.client
  ? window.matchMedia('(max-width: 1024px)').matches
  : false

// -------------- node
export function node(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.firstChild
}

// -------------- toTitleCase
export function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// -------------- toCamelCase
export function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

// -------------- camelToKebabCase
export function camelToKebabCase(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

// -------------- shortenString
export function shortenString(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str
  return str.substr(0, str.lastIndexOf(separator, maxLen))
}

// -------------- fixFocusForButton
export function fixFocusForButton(element) {
  const handleClick = (event) => {
    if (event) event.preventDefault()
  }

  element.addEventListener('mousedown', handleClick)

  element.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      handleClick()
    }
  })
}

// -------------- sanitizeString
export function sanitizeString(string) {
  let output = string.replace( /æ/gi, 'ae' )
  output = output.replace( /ø/gi, 'oe' )
  output = output.replace( /å/gi, 'aa' )
  return output
}

// -------------- getRandomInt
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// -------------- trapFocus
export function trapFocus(element) {
  const KEYCODE_TAB = 9

  const focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  )
  const firstFocusableEl = focusableEls[0]
  const lastFocusableEl = focusableEls[focusableEls.length - 1]

  element.addEventListener('keydown', function (e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
        e.preventDefault()
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus()
        e.preventDefault()
      }
    }
  })
}

// -------------- preventOrphans
export function preventOrphans(string) {
  const prevent = (textItems) => {
    const targetWord = textItems[textItems.length - 2]
    textItems[textItems.length - 2] = targetWord + '&nbsp;'
    return textItems
  }

  let textItems = string
    .trim()
    .replace(/&nbsp;/g, ' ')
    .split(/ (?=[^>]*(?:<|$))/)
  textItems = prevent(textItems)

  return textItems.join(' ').replace(/&nbsp; /g, '&nbsp;')
}

// -------------- slugify
// export function slugify(string) {
//   const a =
//     'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
//   const b =
//     'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
//   const p = new RegExp(a.split('').join('|'), 'g')

//   return string
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, '-') // Replace spaces with -
//     .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
//     .replace(/&/g, '-and-') // Replace & with 'and'
//     .replace(/[^\w\-]+/g, '') // Remove all non-word characters
//     .replace(/\-\-+/g, '-') // Replace multiple - with single -
//     .replace(/^-+/, '') // Trim - from start of text
//     .replace(/-+$/, '') // Trim - from end of text
// }

// -------------- getDocumentScrollTop
export function getDocumentScrollTop() {
  if (window.pageYOffset === undefined) {
    return (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop
  }
  return window.pageYOffset
}

// -------------- isInViewport
export function isInViewport(element, offset) {
  if (element === undefined || element === null) {
    return false
  }

  const winTop = getDocumentScrollTop()
  const winWidth = document.documentElement.clientWidth
  const winHeight = document.documentElement.clientHeight
  const winBottom = winTop + winHeight
  offset = offset || 0

  const rect = element.getBoundingClientRect()
  const elTop = rect.top + winTop - offset
  const elBottom = rect.bottom + winTop + offset

  return (
    elBottom > winTop &&
    rect.right > 0 &&
    rect.left < winWidth &&
    elTop < winBottom
  )
}

// -------------- observe
export function observe(nodes, callback, options = {}) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, options)
    nodes.forEach((node) => observer.observe(node))
  } else {
    let toBeLoaded = [...nodes]
    let active = false

    const lazyLoad = () => {
      if (!active) {
        active = true

        window.setTimeout(() => {
          toBeLoaded.forEach((target) => {
            if (
              isInViewport(target) &&
              window.getComputedStyle(target).display !== 'none'
            ) {
              callback(target)

              toBeLoaded = toBeLoaded.filter((e) => e !== target)

              if (toBeLoaded.length === 0) {
                document.removeEventListener('scroll', lazyLoad)
                window.removeEventListener('resize', lazyLoad)
                window.removeEventListener('orientationchange', lazyLoad)
              }
            }
          })

          active = false
        }, 200)
      }
    }

    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
    lazyLoad()
  }
}

// -------------- padDigits
// export function padDigits(number, digits) {
//   return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
// }

// -------------- mapOrder
// export function mapOrder(array, order, key) {
//   return [...array].sort((a, b) => {
//     const A = a[key]
//     const B = b[key]
//     return order.indexOf(A) > order.indexOf(B) ? 1 : -1
//   })
// }

// -------------- scrollToPosition
export function scrollToPosition(destination, duration, callback) {
  const start = getDocumentScrollTop()
  let startTime = 0
  const delta = destination - start

  // Default easing function
  function easing(t, b, c, d) {
    t /= d / 2
    if (t < 1) {
      return (c / 2) * t * t * t + b
    }
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  function loop(time) {
    startTime || (startTime = time)
    const runTime = time - startTime

    if (duration > runTime) {
      requestAnimationFrame(loop)
      window.scrollTo(0, easing(runTime, start, delta, duration))
    } else {
      if (destination !== delta + start) {
        window.scrollTo(0, delta + start)
      }
      if (typeof callback === 'function') {
        callback(+new Date())
      }
    }
  }

  requestAnimationFrame(loop)
}

// -------------- scrollToElement
export function scrollToElement(element, duration, offset = 0, callback) {
  const rect = element.getBoundingClientRect()
  const offsetTop = rect.top + getDocumentScrollTop() - offset

  scrollToPosition(offsetTop, duration || 500, callback)
}

// -------------- scrollToAnchor
export function scrollToAnchor(event, offset = 0, callback) {
  if (event.currentTarget.hash) {
    event.preventDefault()

    const section = document.querySelector(event.currentTarget.hash)
    if (section) {
      scrollToElement(section, 500, offset, () => {
        if (typeof callback === 'function') {
          callback(event)
        }
        section.focus()
      })
    }
  }
}

// -------------- scrollToSection
export function scrollToSection(selected, offset = 0, callback) {

  const section = document.querySelector(selected.value)

  // console.log(selected.value)
  if (section) {
    scrollToElement(section, 500, offset, () => {
      if (typeof callback === 'function') {
        callback(section)
      }
      section.focus()
    })
  }
}

// -------------- formatShopifyPriceObject
// export function formatShopifyPriceObject(priceObj, multiplier = 1) {
//   try {
//     const amount = priceObj.amount.replace(/\.0+$/g, '') // removes trailing .0

//     return `${amount * multiplier} ${priceObj.currencyCode}`
//   } catch (e) {
//     console.error(
//       `Cannot convert shopify price object to formatted string:
// 			${JSON.stringify(priceObj)}
// 		 `
//     )
//     return '--'
//   }
// }

// -------------- formatShopifyDate
// export function formatShopifyDate(strDate) {
//   const date = new Date(strDate)
//   let formatted_date =
//     date.getFullYear() +
//     '-' +
//     `0${date.getMonth() + 1}`.substring(-2) +
//     '-' +
//     date.getDate()
//   return formatted_date
// }

// export function disableScroll() {
//   const $body = document.body
//   let scrollPosition = 0

//   return {
//     enable() {
//       scrollPosition = window.pageYOffset
//       $body.style.overflow = 'hidden'
//       $body.style.position = 'fixed'
//       $body.style.top = `-${scrollPosition}px`
//       $body.style.width = '100%'
//     },
//     disable() {
//       $body.style.removeProperty('overflow')
//       $body.style.removeProperty('position')
//       $body.style.removeProperty('top')
//       $body.style.removeProperty('width')
//       window.scrollTo(0, scrollPosition)
//     },
//   }
// }

// -------------- debounce
// export function debounce(func, wait, immediate) {
//   let timeout
//   return function () {
//     const context = this,
//       args = arguments
//     const later = function () {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//     const callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }

// -------------- scrollToLeft
// export function scrollToLeft(element, to, duration) {
//   let start = element.scrollLeft,
//     change = to - start,
//     currentTime = 0,
//     increment = 20

//   const easeInOutQuad = function (t, b, c, d) {
//     t /= d / 2
//     if (t < 1) return (c / 2) * t * t + b
//     t--
//     return (-c / 2) * (t * (t - 2) - 1) + b
//   }

//   const animateScroll = function () {
//     currentTime += increment
//     const val = easeInOutQuad(currentTime, start, change, duration)
//     element.scrollLeft = val
//     if (currentTime < duration) {
//       setTimeout(animateScroll, increment)
//     }
//   }

//   animateScroll()
// }

// -------------- toQueryString
// export function toQueryString(obj) {
//   return Object.keys(obj)
//     .map((key) => `${key}=${obj[key]}`)
//     .join('&')
// }
