'use client'
import React, { useEffect, useState } from 'react'

import { TextField, Select, MenuItem, Button, Grid, FormLabel, Paper, Box, Divider } from '@mui/material'

import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

import { toast } from 'react-toastify'

import { apiAnuragGet, apiAnuragPost } from '@/utils/axiosUtils'

const SKILLS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'react', label: 'React' },
  { value: 'aws', label: 'AWS' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' }
]

const JobForm = () => {
  const [jobName, setJobName] = useState('')
  const [account, setAccount] = useState('')
  const [position, setPosition] = useState('')
  const [experience, setExperience] = useState('')
  const [manager, setManager] = useState('')
  const [skills, setSkills] = useState([])

  const [loading, setLoading] = useState(false)
  const [rowData, setRowData] = useState([])

  const getJdList = async () => {
    setLoading(true)

    const data = await apiAnuragGet('/jobDetail')

    const sortedData = data.sort((a: any, b: any) => b.jobId - a.jobId)

    console.log('sortedData', sortedData)

    setRowData(sortedData)
    setLoading(false)
  }

  useEffect(() => {
    getJdList()
  }, [])

  const handleSubmit = async () => {
    const payload = {
      jobName: jobName,
      account: account,
      position: position,
      experience: experience,
      manager: manager,
      skills: skills
    }

    const resp = await apiAnuragPost('/jobDetail', payload)

    if (resp) {
      toast.success('Job Detail Created Successfully')
      getJdList()

      // Reset form fields.
      setJobName('')
      setAccount('')
      setPosition('')
      setExperience('')
      setManager('')
      setSkills([])
    }
  }

  const columns: GridColDef[] = [
    { field: 'jobId', headerName: 'Job ID', width: 50 },
    { field: 'jobName', headerName: 'Job Name', width: 130 },
    { field: 'account', headerName: 'Account', width: 80 },
    { field: 'position', headerName: 'Position', width: 130 },
    { field: 'experience', headerName: 'Experience', width: 100 },
    { field: 'manager', headerName: 'Manager', width: 100 },
    { field: 'skills', headerName: 'Skills', width: 230 },

    // Action, go to /schedule-interview

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      renderCell: () => {
        const link = window.location.origin + `/schedule-interview`

        return (
          <Button size={'small'} variant='contained' onClick={() => (window.location.href = link)}>
            Scedule Interview
          </Button>
        )
      }
    }
  ]

  return (
    <Paper sx={{ p: 4 }}>
      <h1>Create Job Detail</h1>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormLabel>Job Name</FormLabel>
          <TextField
            size='small'
            fullWidth
            placeholder='Java + React'
            value={jobName}
            onChange={(event: any) => setJobName(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Account</FormLabel>
          <TextField
            size='small'
            fullWidth
            placeholder='SBU2'
            value={account}
            onChange={(event: any) => setAccount(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Position</FormLabel>
          <TextField
            size='small'
            fullWidth
            placeholder='Software Engineer'
            value={position}
            onChange={(event: any) => setPosition(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Experience (yrs)</FormLabel>
          <TextField
            size='small'
            fullWidth
            placeholder='2'
            value={experience}
            onChange={(event: any) => setExperience(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Manager</FormLabel>
          <TextField
            size='small'
            fullWidth
            placeholder='Akash Jain'
            value={manager}
            onChange={(event: any) => setManager(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormLabel>Skills</FormLabel>
          <Select
            size='small'
            fullWidth
            placeholder='Skills'
            multiple
            value={skills}
            onChange={(event: any) => setSkills(event.target.value)}
          >
            {SKILLS.sort((a: any, b: any) => a['label'].localeCompare(b['label'])).map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ paddingTop: 4 }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{ border: 0 }}
          getRowId={row => row['jobId'].toString()}
          loading={loading}
        />
      </Box>
    </Paper>
  )
}

export default JobForm
