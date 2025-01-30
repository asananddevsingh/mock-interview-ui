'use client'
import React, { useEffect, useState } from 'react'

import { TextField, Select, MenuItem, Button, Grid, FormLabel, Paper, Box, Divider } from '@mui/material'

import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

import { toast } from 'react-toastify'

import { apiAnuragGet, apiAnuragPost } from '@/utils/axiosUtils'

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
      const link = window.location.origin + `/evaluate-candidate/${candidateId}`

      return (
        <Button size={'small'} variant='contained' onClick={() => navigator.clipboard.writeText(link)}>
          Copy Invite
        </Button>
      )
    }
  }
]

const ScheduleInterview = () => {
  const [candidateName, setCandidateName] = useState('')
  const [email, setEmail] = useState('')
  const [jd, setJd] = useState('')

  const [loading, setLoading] = useState(false)

  const [rowData, setRowData] = useState([])
  const [jdList, setJdList] = useState([])

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

  const getJdList = async () => {
    setLoading(true)
    const data = await apiAnuragGet('/jobDetail')

    if (data?.length) {
      const sorted = data
        .sort((a: any, b: any) => a['jobName'].localeCompare(b['jobName']))
        .map((j: any) => {
          return {
            value: j['jobId'],
            label: `(${j['jobId']}) ${j['jobName']} :: (${j['account']})`
          }
        })

      setJdList(sorted)
    }

    setLoading(false)
  }

  useEffect(() => {
    getGridData()
    getJdList()
  }, [])

  const handleSubmit = async () => {
    const selectedJd = jdList?.find((j: any) => j.value === jd) || { value: 0 }

    const paylod = {
      name: candidateName,
      email: email,
      jobDetail: {
        jobId: selectedJd.value
      }
    }

    const resp = await apiAnuragPost('/candidate', paylod)

    console.log('resp', resp)
    toast.success('Candidate Created Successfully')
    getGridData()

    // create fields
    setCandidateName('')
    setEmail('')
    setJd('')
  }

  return (
    <Paper sx={{ p: 4 }}>
      <h1>Schedule Interview</h1>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormLabel>Candidate Name</FormLabel>
          <TextField
            size='small'
            fullWidth
            value={candidateName}
            onChange={(event: any) => setCandidateName(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Email</FormLabel>
          <TextField size='small' fullWidth value={email} onChange={(event: any) => setEmail(event.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>JD</FormLabel>
          <Select size='small' fullWidth value={jd} onChange={(event: any) => setJd(event.target.value)}>
            <MenuItem value={''}>Select...</MenuItem>
            {jdList?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
      </Grid>

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

export default ScheduleInterview
