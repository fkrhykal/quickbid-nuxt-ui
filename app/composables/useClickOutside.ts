export function useClickOutside<T extends HTMLElement>(
  key: string,
  action: (el: T) => void
) {
  const templateRef = useTemplateRef<T>(key)
  const listener = (e: PointerEvent) => {
    if (
      templateRef.value instanceof HTMLElement &&
      e.target instanceof HTMLElement &&
      !templateRef.value.contains(e.target)
    ) {
      action(templateRef.value)
    }
  }
  onMounted(() => {
    window.addEventListener('click', listener)
  })
  onUnmounted(() => {
    window.removeEventListener('click', listener)
  })
}
