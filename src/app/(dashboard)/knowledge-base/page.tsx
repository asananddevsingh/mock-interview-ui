'use client'

import { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

import { apiLokeshGet } from '@/utils/axiosUtils'
import QuestionDialog from './QuestionDialog'

const columns: GridColDef[] = [
  { field: 'Serial Number', headerName: 'Serial Number', width: 70 },
  { field: 'Technology', headerName: 'Technology', width: 130 },
  { field: 'Question', headerName: 'Question', width: 130 },
  { field: 'Answer', headerName: 'Answer', width: 130 },
  { field: 'Category', headerName: 'Category', width: 130 },
  { field: 'Difficulty', headerName: 'Difficulty', width: 130 },
  { field: 'Reference', headerName: 'Reference', width: 130 }

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
  // }
]

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [knowledgeBase, setKnowledgeBase] = useState([])

  const getKnowledgeBase = async () => {
    setLoading(true)

    const data = await apiLokeshGet('/knowledgebase', {
      question: 'What is your favorite color?',
      correct_answer: 'Blue',
      user_answer: 'Blue'
    })

    if (JSON.parse(data.body).data) {
      const rawData = JSON.parse(data.body).data

      console.log('rawData', rawData)

      const sorted = rawData.sort((a: any, b: any) => a['Serial Number'] - b['Serial Number'])

      console.log('sorted', sorted)

      setKnowledgeBase(sorted)
    }

    setLoading(false)
  }

  useEffect(() => {
    getKnowledgeBase()
  }, [])

  return (
    <Paper className='p-4 flex flex-col gap-4'>
      <Box className='flex justify-between'>
        <Typography variant='h4'>Knowledge Base</Typography>
        <QuestionDialog seqNum={knowledgeBase.length + 1} />
      </Box>
      <DataGrid
        rows={knowledgeBase}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 20, 50]}
        sx={{ border: 0 }}
        loading={loading}
        getRowId={row => row['Serial Number'].toString()}
      />
    </Paper>
  )
}
