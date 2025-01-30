import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormLabel
} from '@mui/material'

import { toast } from 'react-toastify'

import { apiAnuragPost } from '@/utils/axiosUtils'

interface QuestionFormValues {
  technology: string
  question: string
  answer: string
  category: string
  difficulty: string
  reference: string
}

const QuestionDialog = (props: { seqNum: number }) => {
  const [open, setOpen] = useState(false)

  const [values, setValues] = useState<QuestionFormValues>({
    technology: '',
    question: '',
    answer: '',
    category: '',
    difficulty: 'Easy',
    reference: ''
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async () => {
    const payload = {
      serialNumber: props.seqNum,
      technology: values.technology,
      question: values.question,
      answer: values.answer,
      category: values.category,
      difficulty: values.difficulty,
      reference: values.reference
    }

    const response = await apiAnuragPost('/question', { newObject: payload })

    if (response) {
      toast.success('Question added successfully')

      //clear fileds.
      setValues({
        technology: '',
        question: '',
        answer: '',
        category: '',
        difficulty: 'Easy',
        reference: ''
      })
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <Button color='primary' onClick={handleOpen}>
        Add Question
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormLabel>Technology</FormLabel>
              <TextField
                size='small'
                fullWidth
                name='technology'
                placeholder='JavaScript'
                value={values.technology}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Category</FormLabel>
              <TextField
                size='small'
                fullWidth
                name='category'
                placeholder='Data Structure'
                value={values.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Difficulty</FormLabel>
              <Select
                size='small'
                fullWidth
                name='difficulty'
                placeholder='Easy'
                value={values.difficulty}
                onChange={handleChange}
              >
                <MenuItem value='Easy' defaultChecked>
                  Easy
                </MenuItem>
                <MenuItem value='Medium'>Medium</MenuItem>
                <MenuItem value='Hard'>Hard</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Reference</FormLabel>
              <TextField
                size='small'
                fullWidth
                name='reference'
                placeholder='https://w3schools.com'
                value={values.reference}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Question</FormLabel>
              <TextField
                size='small'
                fullWidth
                name='question'
                placeholder='What is JavaScript?'
                value={values.question}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Answer</FormLabel>
              <TextField
                size='small'
                fullWidth
                name='answer'
                placeholder='JavaScript is a programming language.'
                value={values.answer}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QuestionDialog
