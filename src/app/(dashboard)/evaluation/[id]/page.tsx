'use client'
import React, { useEffect, useState } from 'react'

import { Box, Typography, Button, CircularProgress, Divider } from '@mui/material'

const EvaluateResult = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ name: string; report: any[] }>({ name: '', report: [] })
  const [showMore, setShowMore] = useState<any>({})

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      // const data = await apiAnuragGet('/questions')

      // console.log('data', data)

      setLoading(false)

      setData({
        name: 'Anurag Kumar',
        report: [
          {
            serialNumber: 250,
            technology: 'JavaScript',
            question: 'Explain closures in JavaScript.',
            answer:
              "A closure is a function that has access to its outer function's scope, even after the outer function has finished executing.",
            userAnswer: 'test test test',
            accuracyScore: '50%',
            completenessScore: '40%',
            overallScore: '45%',
            feedback:
              'test test test test test test lorem100 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eos delectus illum ipsam quisquam inventore maxime, repellat similique voluptatem at autem nisi ex, ipsa reiciendis pariatur sit debitis veniam rerum officia sunt earum quia, ducimus voluptatum hic! Temporibus placeat corporis, officia tenetur nam, error nemo fugiat, perspiciatis vero aliquid eos explicabo optio doloremque hic! Ratione adipisci ipsum accusantium odit tempora deleniti, ipsam aspernatur optio voluptatem ut quos quaerat quisquam sit, perferendis error sint sapiente reprehenderit. Explicabo amet commodi praesentium voluptatem. Necessitatibus quo totam consequuntur vitae? Voluptas vel suscipit molestiae accusamus! Rem saepe inventore, nesciun'
          },
          {
            serialNumber: 251,
            technology: 'Python',
            question: "What are Python's key features?",
            answer:
              'Python features include dynamic typing, garbage collection, support for multiple programming paradigms, and extensive libraries.',
            userAnswer: 'test test test',
            accuracyScore: '30%',
            completeness_score: '50%',
            overall_score: '40%',
            feedback:
              'test test test lorem100 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eos delectus illum ipsam quisquam inventore maxime, repellat similique voluptatem at autem nisi ex, ipsa reiciendis pariatur sit debitis veniam rerum officia sunt earum quia, ducimus voluptatum hic! Temporibus placeat corporis, officia tenetur nam, error nemo fugiat, perspiciatis vero aliquid eos explicabo optio doloremque hic! Ratione adipisci ipsum accusantium odit tempora deleniti, ipsam aspernatur optio voluptatem ut quos quaerat quisquam sit, perferendis error sint sapiente reprehenderit. Explicabo amet commodi praesentium voluptatem. Necessitatibus quo totam consequuntur vitae? Voluptas vel suscipit molestiae accusamus! Rem saepe inventore, nesciun'
          }
        ]
      })
    }

    getData()
  }, [])

  const handleShowMore = (id: any) => {
    setShowMore((prevShowMore: any) => ({
      ...prevShowMore,
      [id]: !prevShowMore[id]
    }))
  }

  if (loading || !data?.report?.length) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <CircularProgress size={80} />
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 4, p: 4 }}>
      <Box className='flex items-center'>
        <Typography variant='h4' sx={{ mb: 2 }}>
          Candidate Name: {data.name}
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
            <Typography variant='h6'>{result.accuracyScore}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Completeness Score: </Typography>
            <Typography variant='h6'>{result.completenessScore}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant='h6'>Overall Score: </Typography>
            <Typography variant='h6'>{result.overallScore}</Typography>
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
