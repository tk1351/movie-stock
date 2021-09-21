import React, { FC, useState } from 'react'
import {
  Paper,
  Tabs,
  Tab,
  Chip,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { IMovie } from '../../types/movie'
import { a11yProps, TabPanel, crewMetaData } from '../movie/DetailTabs'

interface DummyDetailTabsProps {
  movie: IMovie
}

const DummyDetailTabs: FC<DummyDetailTabsProps> = ({ movie }) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const { crews } = movie

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
                  <Chip label={crew.name} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableBody>
          {movie.studios.map((studio) => (
            <TableRow key={studio.id}>
              <TableCell>制作会社:</TableCell>
              <TableCell>
                <Chip label={studio.studio} />
              </TableCell>
            </TableRow>
          ))}
          {movie.countries.map((country) => (
            <TableRow key={country.id}>
              <TableCell>製作国:</TableCell>
              <TableCell>
                <Chip label={country.country} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TabPanel>
    </Paper>
  )
}

export default DummyDetailTabs
