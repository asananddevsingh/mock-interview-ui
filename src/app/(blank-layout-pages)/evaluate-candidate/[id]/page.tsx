'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'

import Typewriter from '@/components/Typewriter/Typewriter'

const EvaluateCandidate = ({ params: { id } }: { params: { id: string } }) => {
  console.log('id', id)

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      // const data = await apiAnuragGet('/questions')

      // console.log('data', data)

      setLoading(false)

      setQuestions([
        {
          serialNumber: 1,
          technology: 'JavaScript',
          question: 'What is JavaScript?',
          answer: ''
        },
        {
          serialNumber: 2,
          technology: 'JavaScript',
          question: 'Explain closures in JavaScript.',
          answer: ''
        },
        {
          serialNumber: 3,
          technology: 'JavaScript',
          question: 'What are promises in JavaScript?',
          answer: ''
        }
      ])
    }

    getData()
  }, [])

  const handleAnswerChange = (event: any) => {
    const newAnswers = { ...answers }

    newAnswers[currentQuestion] = event.target.value

    setAnswers(newAnswers)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setSubmitted(true)
    }
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

  if (loading || !questions.length) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <CircularProgress size={80} />
      </Box>
    )
  }

  return (
    <Box className='p-8'>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant='h4'>
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
          <Button variant='contained' type='submit' disabled={!answers[currentQuestion]}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EvaluateCandidate
