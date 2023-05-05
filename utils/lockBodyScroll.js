export const lockBodyScroll = (locked) => {
  if (locked) {
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'
    document.body.style.touchAction = 'none'

    document.documentElement.style.overflow = 'hidden'
  } else {
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('overscroll-behavior')
    document.body.style.removeProperty('touch-action')

    document.documentElement.style.removeProperty('overflow')
  }
}
