import React, { useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Chip,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import Link from 'next/link'
import { IMovie } from '../../types/movie'

interface DetailTabsProps {
  movie: IMovie
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export const crewMetaData = [
  { category: 1, name: '監督' },
  { category: 2, name: '脚本' },
  { category: 3, name: '製作' },
  { category: 4, name: '撮影' },
]

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

  const { crews, studios, countries } = movie

  const orderedCrews = (num: number) => {
    return crews.slice().filter((crew) => crew.category === num)
  }

  return (
    <Paper square>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        centered
      >
        <Tab label="スタッフ" {...a11yProps(0)} />
        <Tab label="詳細" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableBody>
          {crewMetaData.map((item) => (
            <TableRow key={item.category}>
              <TableCell>{item.name}</TableCell>
              {orderedCrews(item.category).map((crew) => (
                <TableCell key={crew.id}>
                  <Link
                    href={{ pathname: '/crews', query: { name: crew.name } }}
                  >
                    <Chip label={crew.name} />
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableBody>
          <TableRow>
            <TableCell>制作会社:</TableCell>
            {studios.map((studio) => (
              <TableCell key={studio.id}>
                <Link
                  href={{
                    pathname: '/studios',
                    query: { studio: studio.studio },
                  }}
                >
                  <Chip label={studio.studio} />
                </Link>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>製作国:</TableCell>
            {countries.map((country) => (
              <TableCell key={country.id}>
                <Link
                  href={{
                    pathname: '/countries',
                    query: { country: country.country },
                  }}
                >
                  <Chip label={country.country} />
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </TabPanel>
    </Paper>
  )
}

export default DetailTabs
