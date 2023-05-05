// import { EffectCreative } from 'swiper'
// import { useIsMobile } from '~/utils/useIsMobile'

import { isMobile } from '~/utils'

export function floow({ swiper, extendParams, on }) {
  let oldprogress = 0
  let direction = ''

  extendParams({
    effect: 'creative',
    creativeEffect: {
      limitProgress: 100,
      prev: {
        translate: [`calc(-100% - ${20 - 1}px)`, 0, 0],
      },
      next: {
        translate: [`calc(100% + ${20 - 1}px)`, 0, 0],
      },
    },
  })

  on('progress', (swiper, progress) => {
    direction = progress > oldprogress ? 'NEXT' : 'PREV'
    oldprogress = progress
  })

  on('setTransition', (swiper, transition) => {
    if (transition !== 0 && !isMobile.value) {
      // navigation click
      swiper.slides.forEach((slide, idx) => {
        const delay = transition / 30
        const base =
          direction === 'NEXT'
            ? Math.abs(swiper.realIndex - idx)
            : Math.abs(swiper.slides.length - swiper.realIndex - idx)

        slide.style.transitionDelay = base * delay + 'ms'
      })
    } else {
      // mouse/finger drag
      swiper.slides.forEach((slide) => {
        slide.style.removeProperty('transition-delay')
      })
    }
  })

  on('breakpoint', (swipe, breakpointParams) => {
    const space = swipe.params.spaceBetween
    swipe.params.creativeEffect.prev.translate = [
      `calc(-100% - ${space}px)`,
      0,
      0,
    ]
    swipe.params.creativeEffect.next.translate = [
      `calc(100% + ${space}px)`,
      0,
      0,
    ]
  })
}
