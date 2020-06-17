/**
 * 解决移动端滚动穿透问题，现在貌似不再需要了
 */
export function scrollFix (option?: string) {
  const scrollSelector = option || '.scroller'
  const pos = {
    x: 0,
    y: 0
  }

  function stopEvent (e: TouchEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function recordPosition (e: TouchEvent) {
    pos.x = e.touches[0].clientX
    pos.y = e.touches[0].clientY
  }

  function getParent (target: HTMLElement, selector: string) {
    const parent = target.parentNode as HTMLElement
    // 如果找到html元素，跳出递归
    if (parent.tagName === 'html') return false
    if (parent.classList.contains(selector)) {
      return parent
    } else {
      getParent(parent, selector)
    }
  }

  function watchTouchMove (e: TouchEvent) {
    const target = e.target as HTMLElement
    const parent = getParent(target, scrollSelector)

    let el = target
    if (target.classList.contains(scrollSelector)) el = target
    else if (parent) el = parent
    else return stopEvent(e)

    const dx = e.touches[0].clientX - pos.x
    const dy = e.touches[0].clientY - pos.y
    const direction = dy > 0 ? '10' : '01'
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const offsetHeight = el.offsetHeight
    const isVertical = Math.abs(dx) < Math.abs(dy)
    let status = '11'
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01'
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10'
    }

    if (status === '11' && isVertical && !(parseInt(status, 2) & parseInt(direction, 2))) {
      return stopEvent(e)
    }
  }

  document.addEventListener('touchstart', recordPosition, false)
  document.addEventListener('touchmove', watchTouchMove, false)
}
