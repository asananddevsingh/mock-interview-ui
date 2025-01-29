import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  delay?: number
  onComplete?: () => void
}

const Typewriter = ({ text, delay = 60, onComplete }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }

    if (currentIndex === text.length) {
      if (typeof onComplete === 'function') {
        onComplete()
      }
    }
  }, [currentIndex, delay, text, onComplete])

  return <h2>{currentText}</h2>
}

export default Typewriter
