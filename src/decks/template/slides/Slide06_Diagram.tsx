import { DiagramSlide } from '../layouts'

export default function Slide06_Diagram() {
  return (
    <DiagramSlide
      title="Architecture Overview"
      subtitle="A high-level view of the system"
    >
      <svg width="800" height="400" viewBox="0 0 800 400">
        {/* Background */}
        <rect x="50" y="50" width="200" height="100" rx="12" fill="#F5F6F8" stroke="#DDDADA" />
        <text x="150" y="105" textAnchor="middle" fontSize="18" fontWeight="600" fill="#201E1E">Client Apps</text>

        {/* Arrow */}
        <path d="M 250 100 L 300 100" stroke="#9C9A94" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Middle */}
        <rect x="300" y="50" width="200" height="100" rx="12" fill="#ED2738" />
        <text x="400" y="100" textAnchor="middle" fontSize="18" fontWeight="600" fill="white">API Gateway</text>
        <text x="400" y="125" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.8)">Load Balancing</text>

        {/* Arrow */}
        <path d="M 500 100 L 550 100" stroke="#9C9A94" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Right */}
        <rect x="550" y="50" width="200" height="100" rx="12" fill="#F5F6F8" stroke="#DDDADA" />
        <text x="650" y="105" textAnchor="middle" fontSize="18" fontWeight="600" fill="#201E1E">Storage Layer</text>

        {/* Bottom row */}
        <rect x="200" y="250" width="400" height="100" rx="12" fill="#374967" />
        <text x="400" y="300" textAnchor="middle" fontSize="18" fontWeight="600" fill="white">Data Processing Engine</text>
        <text x="400" y="325" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.8)">Parallel Processing - Distributed Computing</text>

        {/* Vertical arrows */}
        <path d="M 400 150 L 400 250" stroke="#9C9A94" strokeWidth="2" strokeDasharray="5,5" />

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#9C9A94" />
          </marker>
        </defs>
      </svg>
    </DiagramSlide>
  )
}
