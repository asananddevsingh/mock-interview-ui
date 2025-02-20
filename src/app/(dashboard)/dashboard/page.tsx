'use client'
import React, { useEffect, useState } from 'react'

import { Box, Card, CardContent, CardHeader, Chip, CircularProgress, Grid, Typography } from '@mui/material'

import { apiAnuragGet } from '@/utils/axiosUtils'
import CardStatWithImage from './Character'
import OptionMenu from '@/@core/components/option-menu'
import CustomAvatar from '@/@core/components/mui/Avatar'
import CardStatVertical from './Vertical'

interface JobData {
  jobId: number
  jobName: string
  candidateCount: number
}

interface AccountJobCount {
  accountName: string
  jobCount: number
}

interface TechnologyQuestionCount {
  technology: string
  questionCount: number
}

interface InterviewResult {
  status: string
  candidateCount: number
}

interface DashboardData {
  jd: AccountJobCount[]
  candidates: JobData[]
  questions: TechnologyQuestionCount[]
  interviewResult: InterviewResult[]
  skills: string[]
}

const sbuIcons = [
  {
    color: 'primary',
    icon: 'ri-pie-chart-2-line'
  },
  {
    color: 'success',
    icon: 'ri-group-line'
  },
  {
    color: 'warning',

    icon: 'ri-macbook-line'
  },
  {
    color: 'info',
    icon: 'ri-money-dollar-circle-line'
  }
]

const skillsIcons = [
  {
    language: 'javascript',
    color: 'success',
    icon: 'ri-javascript-fill'
  },
  {
    language: 'html',
    color: 'error',
    icon: 'ri-html5-fill'
  },
  {
    language: 'css',
    color: 'error',
    icon: 'ri-css3-fill'
  },
  {
    language: 'python',
    color: 'warning',
    icon: 'mdi-language-python'
  },
  {
    language: 'react',
    color: 'info',
    icon: 'ri-reactjs-line'
  },
  {
    language: 'reactjs',
    color: 'success',
    icon: 'ri-reactjs-line'
  },
  {
    language: 'java',
    color: 'primary',
    icon: 'mdi-language-java'
  },
  {
    language: 'other',
    color: 'warning',
    icon: 'ri-macbook-line'
  }
]

const DashboardPage = () => {
  const [loading, setLoading] = useState(false)

  const [rowData, setRowData] = useState<DashboardData>({} as DashboardData)

  console.log('rowData', rowData)

  const getGridData = async () => {
    setLoading(true)

    const data = await apiAnuragGet('/dashboard/insight')

    setRowData(data)
    setLoading(false)
  }

  useEffect(() => {
    getGridData()
  }, [])

  // const totalJobCount = data.reduce((acc, current) => acc + current.jobCount, 0);

  if (loading) {
    return (
      <Box className='flex items-center justify-center h-full w-full'>
        <CircularProgress size={80} />
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={3} className='self-end'>
        <CardStatWithImage
          stats={rowData?.jd?.reduce((a: any, b: any) => a + b.jobCount, 0)}
          title='Job Descriptions'
          trendNumber='15.6%'
          chipColor='primary'
          src='/images/illustrations/characters/9.png'
          chipText={`Year of ${new Date().getFullYear()}`}
        />
      </Grid>
      <Grid item xs={12} md={6} className='self-end'>
        <Card>
          <CardHeader
            title='Account Details'
            action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Show Details', 'Hide']} />}
            subheader={
              <>
                <span className='font-medium text-textPrimary'>account wise jobs 😎</span>{' '}
                <span className='text-textSecondary'>this month</span>
              </>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              {rowData?.jd?.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar variant='rounded' color={sbuIcons[index]['color'] as any} className='shadow-xs'>
                      <i className={sbuIcons[index]['icon']}></i>
                    </CustomAvatar>
                    <div>
                      <Typography>{item.accountName}</Typography>
                      <Typography variant='h5'>{item.jobCount}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} className='self-end'>
        <CardStatWithImage
          stats={`${rowData?.skills?.length}`}
          trend='negative'
          title='Unique Skills'
          trendNumber='20%'
          chipText='Last Month'
          src='/images/illustrations/characters/10.png'
        />
      </Grid>

      {rowData?.questions?.map((item, index) => {
        const iconDetails = skillsIcons?.find(s => s.language === item.technology?.toLowerCase())

        return (
          <Grid item xs={2} className='self-end' key={index}>
            <CardStatVertical
              key={index}
              stats={item.questionCount as any}
              title={item.technology}
              subtitle='Questions'
              avatarColor={(iconDetails?.color as any) || 'primary'}
              avatarIcon={iconDetails?.icon || 'ri-macbook-line'}
            />
          </Grid>
        )
      })}
      <Grid item xs={7} className='self-end'>
        <Card>
          <CardHeader
            title='Candidates'
            action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Details', 'Hide Card']} />}
            subheader={
              <>
                <span className='font-medium text-textPrimary'>candidates based on unique skills</span>{' '}
                {/* <Chip label={`Year of ${new Date().getFullYear()}`} color={'success'} variant='tonal' size='small' /> */}
              </>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              {rowData?.candidates?.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar variant='rounded' color='primary' className='shadow-xs'>
                      {/* <i className={sbuIcons[index]['icon']}></i> */}
                    </CustomAvatar>
                    <div>
                      <Typography>{item.jobName}</Typography>
                      <Typography variant='h5'>{item.candidateCount}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5} className='self-end'>
        <Card>
          <CardHeader
            title='Result'
            action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Details', 'Hide Card']} />}
            subheader={
              <>
                <span className='font-medium text-textPrimary'>candidates result 😎</span>{' '}
                <Chip label={`Year of ${new Date().getFullYear()}`} color={'success'} variant='tonal' size='small' />
              </>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              {rowData?.interviewResult?.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar variant='rounded' color={sbuIcons[index]['color'] as any} className='shadow-xs'>
                      <i className={sbuIcons[index]['icon']}></i>
                    </CustomAvatar>
                    <div>
                      <Typography>{item.status}</Typography>
                      <Typography variant='h5'>{item.candidateCount}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardPage
