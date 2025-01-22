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

interface QuestionFormValues {
  technology: string
  question: string
  answer: string
  category: string
  difficulty: string
  reference: string
}

const QuestionDialog = () => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <div>
      <Button color='primary' onClick={handleOpen}>
        Add Question
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormLabel>Technology</FormLabel>
                <TextField
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
                  fullWidth
                  name='answer'
                  placeholder='JavaScript is a programming language.'
                  value={values.answer}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            Cancel
          </Button>
          <Button type='submit' form='question-form' color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QuestionDialog
