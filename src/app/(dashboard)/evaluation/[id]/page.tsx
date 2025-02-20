'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, Button, CircularProgress, Divider } from '@mui/material'

import { apiAnuragGet } from '@/utils/axiosUtils'
import Typewriter from '@/components/Typewriter/Typewriter'

const EvaluateResult = ({ params: { id } }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{ name: string; report: any[] }>({ name: '', report: [] })
  const [showMore, setShowMore] = useState<any>({})
  const [showMoreCurrectAnswer, setShowMoreCurrectAnswer] = useState<any>({})

  useEffect(() => {
    const getData = async () => {
      const data = await apiAnuragGet(`/candidate/evaluate/${id}`)

      setLoading(false)
      setData(data)
    }

    getData()
  }, [id])

  const handleShowMore = (id: any) => {
    setShowMore((prevShowMore: any) => ({
      ...prevShowMore,
      [id]: !prevShowMore[id]
    }))
  }

  const handleShowMoreCurrectAnswer = (id: any) => {
    setShowMoreCurrectAnswer((prevShowMore: any) => ({
      ...prevShowMore,
      [id]: !prevShowMore[id]
    }))
  }

  if (loading) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <CircularProgress size={80} />
      </Box>
    )
  }

  if (!loading && data?.report?.length === 0) {
    return (
      <Box className='flex flex-col items-center justify-center  gap-4 w-full'>
        <Typewriter text='Candidate has yet not taken the test.' />
        <Button
          variant='outlined'
          onClick={() => window.history.back()}
          startIcon={<i className='bx bx-left-arrow-alt' />}
        >
          Go Back
        </Button>
      </Box>
    )
  }

  const getAccuracy = () => {
    const totalScore = data.report?.reduce((n, { accuracyScore }) => n + accuracyScore, 0)

    return Number(totalScore / data.report.length).toFixed(2)
  }

  const getCompletness = () => {
    const totalScore = data.report?.reduce((n, { completenessScore }) => n + completenessScore, 0)

    return Number(totalScore / data.report.length).toFixed(2)
  }

  const getScore = () => {
    const totalScore = data.report?.reduce((n, { overallScore }) => n + overallScore, 0)

    return Number(totalScore / data.report.length).toFixed(2)
  }

  return (
    <Box sx={{ mb: 4, p: 4 }}>
      <Box className='flex items-center justify-end'>
        <Button
          variant='outlined'
          onClick={() => window.history.back()}
          startIcon={<i className='bx bx-left-arrow-alt' />}
        >
          Go Back
        </Button>
      </Box>
      <Typography variant='h4' color={'primary'}>
        Candidate Evaluation Report
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Box className='flex items-center justify-between'>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Name: <strong>{data.name}</strong>
        </Typography>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Accuray: <strong>{getAccuracy()} %</strong>
        </Typography>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Completness: <strong>{getCompletness()} %</strong>
        </Typography>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Score: <strong>{getScore()} %</strong>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
      {data.report.map((result: any, index: any) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Question {index + 1}: </Typography>
            <Typography variant='body1'>{result.question}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Candidate Answer: </Typography>
            <Typography variant='body1'>{result.userAnswer}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Accuracy Score: </Typography>
            <Typography variant='h6'>{result.accuracyScore}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Completeness Score: </Typography>
            <Typography variant='h6'>{result.completenessScore}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Overall Score: </Typography>
            <Typography variant='h6'>{result.overallScore}%</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Feedback: </Typography>
            <Typography variant='h6'>
              {showMore[result.serialNumber] ? result.feedback : result.feedback.substring(0, 100) + '...'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {result.feedback.length > 100 && (
              <Button variant='text' onClick={() => handleShowMore(result.serialNumber)}>
                {showMore[result.serialNumber] ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Correct Answer: </Typography>
            <Typography variant='h6'>
              {showMoreCurrectAnswer[result.serialNumber] ? result.answer : result.answer.substring(0, 100) + '...'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {result.feedback.length > 100 && (
              <Button variant='text' onClick={() => handleShowMoreCurrectAnswer(result.serialNumber)}>
                {showMoreCurrectAnswer[result.serialNumber] ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Box>
          <Divider sx={{ my: 4 }} />
        </Box>
      ))}
    </Box>
  )
}

export default EvaluateResult

// const EvaluateResult = async ({ params: { id } }: { params: { id: string } }) => {
//   return 'Result Id: ' + id
// }

// export default EvaluateResult
