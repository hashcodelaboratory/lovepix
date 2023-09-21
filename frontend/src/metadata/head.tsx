import { default as NextHead } from 'next/head'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../localization/localization-key'
import { useEffect, useRef } from 'react'
import { getBannerImage } from './get-banner-image'

type MetaTagsType = {
  title: string
  description: string
}

export const Head = ({ title, description }: MetaTagsType) => {
  const { t } = useTranslation()
  const url = useRef<string>('')

  useEffect(() => {
    url.current = window.location.href
  }, [])

  const localizedDescription = t(
    description ?? localizationKey.metaDescriptionDefault
  )
  const localizedAuthor = t(localizationKey.metaAuthorText)
  const localizedKeywords = t(localizationKey.metaKeywordsText)
  const localizedTitle = t(title ?? localizationKey.metaTitleDefault)
  const banner = getBannerImage()

  return (
    <NextHead>
      <title>{localizedTitle}</title>
      <meta itemProp='name' content='Lovepix' />
      <meta itemProp='description' content={localizedDescription} />
      <meta itemProp='image' content={banner} />
      <meta name='description' content={localizedDescription} />
      <meta name='keywords' content={localizedKeywords} />
      <meta name='author' content={localizedAuthor} />
      <meta property='og:url' content={url.current} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={localizedTitle} />
      <meta property='og:description' content={localizedDescription} />
      <meta property='og:image' content={banner} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={localizedTitle} />
      <meta name='twitter:description' content={localizedDescription} />
      <meta name='twitter:image' content={banner} />
    </NextHead>
  )
}
