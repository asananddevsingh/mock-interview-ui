'use client'
import { useEffect, useState } from 'react'

import { Button, Paper, Box } from '@mui/material'

import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

import { apiAnuragGet } from '@/utils/axiosUtils'

const Evaluation = () => {
  const [loading, setLoading] = useState(false)

  const [rowData, setRowData] = useState([])

  const getGridData = async () => {
    setLoading(true)

    const data = await apiAnuragGet('/candidate')

    setRowData(
      data.map((d: any) => {
        return {
          ...d,
          jobName: d?.jobDetail?.jobName
        }
      })
    )
    setLoading(false)
  }

  useEffect(() => {
    getGridData()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Candidate Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'jobName', headerName: 'Job Description', width: 400 },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      renderCell: params => {
        const candidateId = params.row.id

        // Navigate to evaluation page i.e. /evaluate/{id}

        const link = window.location.origin + `/evaluation/${candidateId}`

        return (
          <Button size={'small'} variant='contained' onClick={() => (window.location.href = link)}>
            Show Result
          </Button>
        )
      }
    }
  ]

  return (
    <Paper sx={{ p: 4 }}>
      <h1>Evaluation Result</h1>
      <Box sx={{ paddingTop: 4 }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{ border: 0 }}
          getRowId={row => row['id'].toString()}
          loading={loading}
        />
      </Box>
    </Paper>
  )
}

export default Evaluation
