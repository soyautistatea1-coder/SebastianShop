import { gsap } from 'gsap'

export const runRevealAnimation = (scope) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.reveal-item',
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      },
    )
  }, scope)

  return () => ctx.revert()
}

export const runFloatAnimation = (target) => {
  const tween = gsap.to(target, {
    y: -10,
    duration: 2.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  return () => tween.kill()
}
