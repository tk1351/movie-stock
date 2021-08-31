import React from 'react'
import { NextPage } from 'next'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

interface AutoCompleteFormProps {
  autocomplete: {
    onChange: (...event: any[]) => void
    id: string
    options: string[]
  }
  textField: {
    label: string
    id: string
    type: string
    name: string
    defaultValue?: string
    className: string
    variant: 'filled' | 'outlined' | 'standard'
    helperText?: string | undefined
    error?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
      freeSolo
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={textField.label}
          id={textField.id}
          type={textField.type}
          name={textField.name}
          defaultValue={textField.defaultValue}
          variant={textField.variant}
          className={textField.className}
          helperText={textField.helperText}
          error={textField.error}
          onChange={textField.onChange}
        />
      )}
    />
  )
}

export default AutoCompleteForm
