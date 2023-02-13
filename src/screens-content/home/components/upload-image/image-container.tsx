import { WALLER_IMAGE_LIST } from '../../utils/image-upload'
import { TextAlign } from '../../enums/enums'
import { Grid } from '@mui/material'
import ImageCard from './image-card'
import { Masonry } from '@mui/lab'
import DropzoneContainer from './dropzone/dropzone-container'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { configurationsTable } from '../../../../../database.config'
import { useLiveQuery } from 'dexie-react-hooks'
import { CONF } from 'common/indexed-db/enums/storeNames'
import { handleDB } from './utils'

const ImageContainer = () => {
  const router = useRouter()

  const data = useLiveQuery(() => configurationsTable.get(CONF), [])

  return (
    <Grid sm={12} textAlign={TextAlign.RIGHT} style={{ marginTop: '64px' }}>
      <Masonry columns={3} spacing={4}>
        <DropzoneContainer />
        {WALLER_IMAGE_LIST.map(({ sourceUrl, title }) => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              key={uuidv4()}
              onClick={handleDB(sourceUrl, data, configurationsTable, router)}
            >
              <ImageCard sourceUrl={sourceUrl} title={title} />
            </div>
          )
        })}
        <button style={{ height: '200px', borderRadius: '0.5rem' }}>
          Gallery
        </button>
      </Masonry>
    </Grid>
  )
}

export default ImageContainer
