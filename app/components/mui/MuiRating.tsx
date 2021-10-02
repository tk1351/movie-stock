import React, { FC } from 'react'
import { Rating } from '@material-ui/lab'

type MuiRatingProps = {
  name: string
  onChange: () => void
  size: 'small' | 'medium' | 'large' | undefined
  defaultValue?: number
}

const MuiRating: FC<MuiRatingProps> = ({
  name,
  onChange,
  size,
  defaultValue,
}) => {
  return (
    <Rating
      name={name}
      onChange={onChange}
      size={size}
      precision={0.5}
      defaultValue={defaultValue}
    />
  )
}

export default MuiRating
