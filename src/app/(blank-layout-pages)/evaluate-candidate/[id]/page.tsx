'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'

import { toast } from 'react-toastify'

import Typewriter from '@/components/Typewriter/Typewriter'
import { apiAnuragPost } from '@/utils/axiosUtils'

const EvaluateCandidate = ({ params: { id } }: { params: { id: string } }) => {
  console.log('id', id)

  const [loading, setLoading] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)
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
          answer: 'JavaScript is a high-level, interpreted programming language used to make web pages interactive.',
          category: 'Basics',
          difficulty: 'Easy',
          reference: 'MDN Web Docs'
        },
        {
          serialNumber: 124,
          technology: 'JavaScript',
          question: 'Explain closures in JavaScript.',
          answer:
            "A closure is a function that has access to its outer function's scope, even after the outer function has finished executing.",
          category: 'Functions',
          difficulty: 'Medium',
          reference: 'MDN Web Docs'
        },
        {
          serialNumber: 125,
          technology: 'JavaScript',
          question: 'What are promises in JavaScript?',
          answer:
            'Promises are objects that represent the eventual completion or failure of an asynchronous operation and its resulting value.',
          category: 'Asynchronous',
          difficulty: 'Medium',
          reference: 'JavaScript.info'
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
          <Button variant='contained' type='submit' disabled={!answers[currentQuestion] || loadingNext}>
            {loadingNext ? 'Submiting...' : `Submit ${currentQuestion + 1} of ${questions.length}`}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EvaluateCandidate
