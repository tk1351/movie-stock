import React, { FC } from 'react'
import Link from 'next/link'
import { Button } from '@material-ui/core'
import styles from '../../styles/components/common/backButton.module.css'

interface BackButtonProps {
  href: string
  text: string
}

const BackButton: FC<BackButtonProps> = ({ href, text }) => {
  return (
    <div className={styles.link}>
      <Button variant="contained" color="default">
        <Link href={href}>
          <a>{text}</a>
        </Link>
      </Button>
    </div>
  )
}

export default BackButton
