import { Grid } from '@mui/material'
import styles from '../materials.module.scss'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

export type Material = {
  title?: string
  subtitle?: string
  description?: string
  illustration?: string
  id?: string
}

export const materialSection = (material: Material, index: number) => {
  const direction = index % 2 ? 'row-reverse' : 'row'

  return (
    <Grid
      className={styles.component}
      sx={{ my: 8 }}
      container
      rowSpacing={4}
      columnSpacing={4}
      direction={direction}
      alignItems='center'
    >
      <Grid item xs={12} md={3}>
        <Image
          alt={material.title}
          style={{ borderRadius: 10 }}
          key={uuidv4()}
          src={material?.illustration ?? ''}
          height={200}
          width={200}
          layout='responsive'
          objectFit='cover'
        />
      </Grid>
      <Grid item xs={12} md={9} id={material.id}>
        <p className={styles.title}>{material.title}</p>
        <p className={styles.text}>{material.subtitle}</p>
        <p className={styles.text}>{material.description}</p>
      </Grid>
    </Grid>
  )
}
