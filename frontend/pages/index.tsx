import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeLayout from '../src/screens-content/home/home'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable } from '../database.config'
import { CONFIGURATION_TABLE_KEY } from '../src/common/indexed-db/hooks/keys'
import { useGallery } from '../src/common/api/use-gallery'
import FooterLayout from '../src/screens-content/footer/footer'
import ReactGA from 'react-ga'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Html, OrbitControls } from '@react-three/drei'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
const BrowserCompatibility = dynamic(
  () =>
    import(
      '@zappar/zappar-react-three-fiber/lib/Components/util/Compatibility'
    ),
  {
    ssr: false,
  }
)

const ZapparCamera = dynamic(
  () => import('@zappar/zappar-react-three-fiber/lib/Components/ZapparCamera'),
  { ssr: false }
)

const ZapparCanvas = dynamic(
  () => import('@zappar/zappar-react-three-fiber/lib/Components/ZapparCanvas'),
  { ssr: false }
)

const InstantTracker = dynamic(
  () =>
    import(
      '@zappar/zappar-react-three-fiber/lib/Components/trackers/InstantTrackerGroup'
    ),
  { ssr: false }
)

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '')

// const Box = (props: any) => {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef<any>()
//   // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false)
//   const [clicked, click] = useState(false)
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += delta))
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

const Home: NextPage = () => {
  let [placementMode, setPlacementMode] = useState(true)

  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const { data: galleryData, isLoading } = useGallery()

  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <Canvas style={{ height: '500px' }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[-3.2, 0, 0]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Box position={[3.2, 0, 0]} />
          <OrbitControls />
        </Canvas>
        <div style={{ height: '1200px' }}>
          <BrowserCompatibility />
          <ZapparCanvas>
            <ZapparCamera environmentMap permissionRequest />
            <InstantTracker
              placementMode={placementMode}
              placementCameraOffset={[0, 0, -5]}
            >
              <mesh>
                <sphereGeometry />
                <meshStandardMaterial color='hotpink' />
              </mesh>
            </InstantTracker>
            <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          </ZapparCanvas>
        </div>
        <div
          className={styles.zapparPlacementUi}
          id='zappar-placement-ui'
          onClick={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode)
          }}
          onKeyDown={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode)
          }}
          role='button'
          tabIndex={0}
        >
          Tap here to
          {placementMode ? ' place ' : ' pick up '}
          the object
        </div>
        <HomeLayout
          configuration={configuration}
          galleryData={galleryData}
          loading={isLoading}
        />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
