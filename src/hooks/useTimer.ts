import { useState, useEffect } from 'react'

interface IProps {
  milliSeconds: number
  boundary: number
}

const defaultValues = {
  milliSeconds:1000,
  boundary:60
}

const useTimer = ({milliSeconds, boundary}: IProps = defaultValues) => {
  const [ time, setTime ] = useState<number>(0)
  const [ interv, setInterv ] = useState<NodeJS.Timer | null>(null)
  const [ ended, setEnded ] = useState<boolean>(false)

  useEffect(() => {
    if (time === boundary)
      resetTimer(true)
  }, [time])

  const startTimer = ():void => {
    if (interv) return
    const interval = setInterval(() => setTime(prev => prev + 1), milliSeconds)
    setInterv(interval)
  }

  const stopTimer = ():void => {
    if (!interv) return
    clearInterval(interv)
    setInterv(null)
  }
  
  const resetTimer = (end:boolean = false):void => {
    stopTimer()
    setTime(0)
    setEnded(end)
  }

  return { time, interv, startTimer, stopTimer, resetTimer, ended }
}

export default useTimer