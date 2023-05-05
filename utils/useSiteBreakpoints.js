import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '~/utils/breakpoints'

export const useSiteBreakpoints = () => {
  const breakpoint = useBreakpoints(breakpoints)
  const isMobile = breakpoint.smaller('sm')
  const isTablet = breakpoint.smaller('md')
  const isSmallScreen = breakpoint.smaller('lg')
  const isLarge = breakpoint.greater('xxl')

  return { isMobile, isTablet, isSmallScreen, isLarge }
}
