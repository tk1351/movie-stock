import React, { FC } from 'react'
import { TextField } from '@material-ui/core'
import { RefCallBack } from 'react-hook-form'

type MuiTextFieldProps = {
  label: string
  id: string
  type: string
  name: string
  variant: 'standard' | 'outlined' | 'filled' | undefined
  defaultValue?: string | number
  value?: string
  onChange?: () => void
  inputRef?: RefCallBack
  helperText?: string
  error?: boolean
  className?: string
}

const MuiTextField: FC<MuiTextFieldProps> = ({
  label,
  id,
  type,
  name,
  variant,
  defaultValue,
  value,
  onChange,
  inputRef,
  helperText,
  error,
  className,
}) => {
  return (
    <TextField
      label={label}
      id={id}
      type={type}
      name={name}
      variant={variant}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      inputRef={inputRef}
      helperText={helperText}
      error={error}
      className={className}
    />
  )
}

export default MuiTextField
