'use client'
import { useEffect } from 'react'

import { apiPost } from '@/utils/axiosUtils'

export default function Page() {
  useEffect(() => {
    const getData = async () => {
      const data = await apiPost('/evaluate', {
        question: 'What is your favorite color?',
        correct_answer: 'Blue',
        user_answer: 'Blue'
      })

      console.log('data', data)
    }

    getData()
  })

  return <h1>JD!</h1>
}
