import { OutlineSlide } from '../layouts'

export default function Slide02_Outline() {
  return (
    <OutlineSlide
      title="Agenda"
      items={[
        { title: 'Introduction', active: true },
        { title: 'Key Features' },
        { title: 'Technical Deep Dive' },
        { title: 'Demo' },
        { title: 'Q&A' },
      ]}
    />
  )
}
