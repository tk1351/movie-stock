import React, { FC } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'

type MuiSelectProps = {
  label: string
  name: string
  id: string
  onChange: (...event: any[]) => void
  value?: any
  error?: boolean
  defaultValue?: any
  menuItems: string[]
  helperText?: string
  className?: string
}

const MuiSelect: FC<MuiSelectProps> = ({
  label,
  name,
  id,
  onChange,
  value,
  error,
  defaultValue,
  menuItems,
  helperText,
  className,
}) => {
  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        aria-label={label}
        label={label}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        error={error}
      >
        {menuItems.map((menuItem, i) => (
          <MenuItem key={i} value={i + 1}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default MuiSelect
