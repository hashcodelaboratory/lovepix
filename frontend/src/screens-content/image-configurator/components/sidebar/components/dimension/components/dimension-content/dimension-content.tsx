import Box from '@mui/material/Box'
import { Tabs, Tab } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import { a11yProps } from './utils/utils'
import TabPanel from './components/tab-panel'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../../../../../messages/messages'
import TabPanelBox from './components/tab-panel-box'
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from 'screens-content/home/utils/configuration'
import { configurationsTable } from '../../../../../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from '../../../../../../../../common/indexed-db/hooks/keys'
import { Configuration } from '../../../../../../../../common/types/configuration'
import { useGalleryDetail } from '../../../../../../../../common/api/use-gallery-detail'
import { splitDimensions } from './utils/split-dimensions'

type DimensionContentProps = {
  configuration: Configuration
}

const DimensionContent = ({ configuration }: DimensionContentProps) => {
  const { t } = useTranslation()

  const { data: galleryDetail } = useGalleryDetail(configuration?.galleryItemId)
  const galleryDimensions: string[] = galleryDetail?.dimensions

  const { byWidth, byHeight, bySquare } = splitDimensions(galleryDimensions)

  const dimensionsSquare = configuration?.galleryItemId
    ? bySquare
    : dimensionsBySquare
  const dimensionsWidth = configuration?.galleryItemId
    ? byWidth
    : dimensionsByWidth
  const dimensionsHeight = configuration?.galleryItemId
    ? byHeight
    : dimensionsByHeight

  const [value, setValue] = useState(0)

  useEffect(() => {
    if (dimensionsSquare.find((dim) => dim === configuration?.dimensionId)) {
      setValue(2)
    }
    if (dimensionsWidth.find((dim) => dim === configuration?.dimensionId)) {
      setValue(0)
    }
    if (dimensionsHeight.find((dim) => dim === configuration?.dimensionId)) {
      setValue(1)
    }
  }, [configuration?.dimensionId])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const changeDimension = (id: string) => {
    configurationsTable.update(CONFIGURATION_TABLE_KEY, {
      dimensionId: id,
    })
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='fullWidth'
          visibleScrollbar
        >
          <Tab label={String(t(messages.byWidth))} {...a11yProps(0)} />
          <Tab label={String(t(messages.byHeight))} {...a11yProps(1)} />
          <Tab label={String(t(messages.square))} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {dimensionsWidth.map((dim) => (
          <TabPanelBox
            selected={dim === configuration?.dimensionId}
            x={dim}
            onClick={() => changeDimension(dim)}
            key={dim}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {dimensionsHeight.map((dim) => (
          <TabPanelBox
            selected={dim === configuration?.dimensionId}
            x={dim}
            onClick={() => changeDimension(dim)}
            style={{ width: 60, height: 80, marginRight: 10 }}
            key={dim}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {dimensionsSquare.map((dim) => (
          <TabPanelBox
            selected={dim === configuration?.dimensionId}
            x={dim}
            onClick={() => changeDimension(dim)}
            style={{ width: 70, height: 70, padding: 5 }}
            key={dim}
          />
        ))}
      </TabPanel>
    </div>
  )
}

export default DimensionContent
