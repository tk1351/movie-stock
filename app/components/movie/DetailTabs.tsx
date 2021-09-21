import React, { useState } from 'react'
import { NextPage } from 'next'
import { Box, Typography, Paper, Tabs, Tab, Chip } from '@material-ui/core'
import Link from 'next/link'
import { IMovie } from '../../types/movie'
import styles from '../../styles/components/movie/detailTabs.module.css'

interface DetailTabsProps {
  movie: IMovie
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export const crewCategory = {
  1: '監督',
  2: '脚本',
  3: '製作',
  4: '撮影',
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const a11yProps = (index: any) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

const DetailTabs: NextPage<DetailTabsProps> = ({ movie }) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Paper square>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
      >
        <Tab label="スタッフ" {...a11yProps(0)} />
        <Tab label="詳細" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {movie.crews.map((crew) => (
          <div key={crew.id} className={styles.tabPanel}>
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              className={styles.typography}
            >
              {crewCategory[crew.category]}:
            </Typography>
            <Link href={{ pathname: '/crews', query: { name: crew.name } }}>
              <Chip label={crew.name} className={styles.chip} />
            </Link>
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {movie.studios.map((studio) => (
          <div key={studio.id} className={styles.tabPanel}>
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              className={styles.typography}
            >
              制作会社:
            </Typography>
            <Link
              href={{
                pathname: '/studios',
                query: { studio: studio.studio },
              }}
            >
              <Chip label={studio.studio} className={styles.chip} />
            </Link>
          </div>
        ))}
        {movie.countries.map((country) => (
          <div key={country.id} className={styles.tabPanel}>
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              className={styles.typography}
            >
              製作国:
            </Typography>
            <Link
              href={{
                pathname: '/countries',
                query: { country: country.country },
              }}
            >
              <Chip label={country.country} className={styles.chip} />
            </Link>
          </div>
        ))}
      </TabPanel>
    </Paper>
  )
}

export default DetailTabs
