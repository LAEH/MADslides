/**
 * Slide 01: Title Slide
 * DDN Infinia Technical Overview
 */
import { TitleSlide } from './layouts'

export default function Slide01_Title() {
  return (
    <TitleSlide
      title="Infinia Technical Overview"
      tags={['Any Scale', 'Any Data Center', 'Any Cloud']}
      badge="NDA ONLY"
    />
  )
}

export const metadata = {
  id: 1,
  title: 'Infinia Technical Overview',
  section: 'Introduction'
}
