import React from 'react'
import { NextPage } from 'next'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

interface AutoCompleteFormProps {
  autocomplete: {
    onChange: (...event: any[]) => void
    id: string
    options: string[]
    value?: any
  }
  textField: {
    label: string
    id: string
    type: string
    name: string
    className: string
    variant: 'filled' | 'outlined' | 'standard'
    helperText?: string | undefined
    error?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: any
  }
}

const AutoCompleteForm: NextPage<AutoCompleteFormProps> = ({
  autocomplete,
  textField,
}) => {
  return (
    <Autocomplete
      onChange={autocomplete.onChange}
      selectOnFocus
      id={autocomplete.id}
      options={autocomplete.options}
      value={autocomplete.value}
      freeSolo
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={textField.label}
          id={textField.id}
          type={textField.type}
          name={textField.name}
          variant={textField.variant}
          className={textField.className}
          helperText={textField.helperText}
          error={textField.error}
          onChange={textField.onChange}
          value={textField.value}
        />
      )}
    />
  )
}

export default AutoCompleteForm
