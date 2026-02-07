import { ContentSlide } from '../layouts'

export default function Slide04_Content() {
  return (
    <ContentSlide
      title="Content Slide Example"
      subtitle="Use this layout for custom content"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <div style={{
          background: '#F5F6F8',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: '#ED2738', marginBottom: '16px' }}>100+</div>
          <div style={{ fontSize: '1.25rem', color: '#686162' }}>Customers</div>
        </div>
        <div style={{
          background: '#F5F6F8',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: '#ED2738', marginBottom: '16px' }}>50PB</div>
          <div style={{ fontSize: '1.25rem', color: '#686162' }}>Data Managed</div>
        </div>
        <div style={{
          background: '#F5F6F8',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: '#ED2738', marginBottom: '16px' }}>99.99%</div>
          <div style={{ fontSize: '1.25rem', color: '#686162' }}>Uptime</div>
        </div>
      </div>
    </ContentSlide>
  )
}
