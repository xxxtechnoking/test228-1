import { useState,useEffect,useCallback,} from 'react'
function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.height
  })

  const onResize = useCallback(
    () => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.height
      })
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return size
}

export default useWinSize