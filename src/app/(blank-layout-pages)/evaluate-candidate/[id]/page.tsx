/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material'

import { toast } from 'react-toastify'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import Typewriter from '@/components/Typewriter/Typewriter'
import { apiAnuragGet, apiAnuragPost } from '@/utils/axiosUtils'

// import useWebcamScreenshotInterval from '@/@core/hooks/useWebcamScreenshotInterval'

const EvaluateCandidate = ({ params: { id } }: { params: { id: string } }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  // const screenshots = useWebcamScreenshotInterval({ duration: 10000 })

  // console.log('screenshots', screenshots)

  // useEffect(() => {
  // console.log('screenshots', screenshots)
  // const imgSrc = URL.createObjectURL(screenshots[0])
  // }, [screenshots])

  const [loading, setLoading] = useState(true)
  const [loadingNext, setLoadingNext] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      const data = await apiAnuragGet(`/question/byJob/${id}`)

      if (data) {
        setQuestions(data)
      }

      setLoading(false)
    }

    getData()
  }, [id])

  useEffect(() => {
    if (listening) {
      const newAnswers = { ...answers }

      newAnswers[currentQuestion] = transcript

      setAnswers(newAnswers)
    }
  }, [listening, transcript])

  const handleAnswerChange = (event: any) => {
    const newAnswers = { ...answers }

    newAnswers[currentQuestion] = event.target.value

    setAnswers(newAnswers)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoadingNext(true)
    SpeechRecognition.stopListening()
    resetTranscript()

    const resp = await apiAnuragPost('/candidate/answer', {
      candidateId: Number(id),
      serialNumber: questions[currentQuestion].serialNumber,
      userAnswer: answers[currentQuestion]
    })

    console.log('resp', resp)

    if (resp === 'success') {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setSubmitted(true)
      }
    } else {
      toast.error('Something went wrong. Please try again.')
    }

    setLoadingNext(false)
  }

  if (submitted) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <Box className='flex items-center justify-center h-full w-[50%]'>
          <Typewriter text='Thank you for submitting your answers! We will get back to you soon. Meanwhile you can check out our website to learn about US and our services at https://irissoftware.com/' />
        </Box>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <CircularProgress size={80} />
      </Box>
    )
  }

  if (!loading && !questions.length) {
    return (
      <Box className='flex items-center justify-center h-[50%] w-full'>
        <h4>
          This seems to be an invalid invite. Please contact @ <span className='text-primary'>support@iris.com</span>
        </h4>
      </Box>
    )
  }

  return (
    <Box className='p-8'>
      <h2>Best of luck.</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant='h3'>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body1' className='text-xl'>
            {questions[currentQuestion].question}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            autoFocus
            multiline
            minRows={4}
            fullWidth
            value={answers[currentQuestion] || ''}
            onChange={handleAnswerChange}
            placeholder='Start speaking or type your answer here...'
          />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button
              disabled={!browserSupportsSpeechRecognition || loadingNext}
              color={listening ? 'error' : 'primary'}
              onClick={() => {
                if (listening) {
                  SpeechRecognition.stopListening()
                } else {
                  SpeechRecognition.startListening({ continuous: true })
                }
              }}
            >
              {listening ? 'Stop Speaking' : 'Start Speaking'}
            </Button>
            <Box>
              {!browserSupportsSpeechRecognition && (
                <Alert severity='warning' sx={{ p: 1 }}>
                  Your browser do not supports speech recognition
                </Alert>
              )}
            </Box>
          </Box>
          <Button color='success' type='submit' disabled={!answers[currentQuestion] || loadingNext || listening}>
            {loadingNext ? 'Submiting...' : `Submit ${currentQuestion + 1} of ${questions.length}`}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EvaluateCandidate
