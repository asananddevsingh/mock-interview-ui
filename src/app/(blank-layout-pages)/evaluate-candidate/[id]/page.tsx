'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'

import { toast } from 'react-toastify'

import Typewriter from '@/components/Typewriter/Typewriter'
import { apiAnuragGet, apiAnuragPost } from '@/utils/axiosUtils'

const EvaluateCandidate = ({ params: { id } }: { params: { id: string } }) => {
  console.log('id', id)

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

  const handleAnswerChange = (event: any) => {
    const newAnswers = { ...answers }

    newAnswers[currentQuestion] = event.target.value

    setAnswers(newAnswers)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoadingNext(true)

    const resp = await apiAnuragPost('/candidate/answer', {
      candidateId: Number(id),
      serialNumber: questions[currentQuestion].serialNumber,
      userAnswer: answers[currentQuestion]
    })

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
            rows={4}
            fullWidth
            value={answers[currentQuestion] || ''}
            onChange={handleAnswerChange}
          />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' type='submit' disabled={!answers[currentQuestion] || loadingNext}>
            {loadingNext ? 'Submiting...' : `Submit ${currentQuestion + 1} of ${questions.length}`}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EvaluateCandidate
