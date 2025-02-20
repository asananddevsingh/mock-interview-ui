import { useRef, useState, useEffect } from 'react'

interface UseWebcamScreenshotIntervalOptions {
  duration: number
}

const useWebcamScreenshotInterval = ({ duration }: UseWebcamScreenshotIntervalOptions) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [screenshots, setScreenshots] = useState<Blob[]>([])

  useEffect(() => {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: true
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => setStream(stream))
      .catch((error: Error) => console.log(error))
  }, [])

  useEffect(() => {
    if (stream !== null) {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new (globalThis as any).ImageCapture(track)

      intervalRef.current = setInterval(() => {
        imageCapture
          .takePhoto()
          .then((blob: Blob) => {
            setScreenshots(prevState => [...prevState, blob])
          })
          .catch((error: Error) => {
            console.log(error)
            clearInterval(intervalRef.current!)
          })
      }, duration)
    }

    return () => {
      clearInterval(intervalRef.current!)
    }
  }, [stream, duration])

  return screenshots
}

export default useWebcamScreenshotInterval
