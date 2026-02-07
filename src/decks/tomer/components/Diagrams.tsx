import React from 'react';

// --- SHARED DEFS ---
const SharedDefs = () => (
  <defs>
    <filter id="shadow-node" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
    </filter>

    {/* Be-Tree Gradients */}
    <linearGradient id="grad-cup" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
      <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
    </linearGradient>

    {/* LSM Patterns */}
    <pattern id="pattern-sstable-teal" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#0E7490" opacity="0.4" />
    </pattern>
    <pattern id="pattern-sstable-blue" width="4" height="4" patternUnits="userSpaceOnUse">
      <path d="M 0 4 L 4 0" stroke="#0369A1" strokeWidth="0.5" opacity="0.3" />
    </pattern>
    <pattern id="grid-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    </pattern>

    {/* Arrow Marker */}
    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0 0 L 6 3 L 0 6 Z" fill="currentColor" />
    </marker>
    <marker id="arrow-yellow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0 0 L 6 3 L 0 6 Z" fill="#FBBF24" />
    </marker>
  </defs>
);

// B-Tree Diagram
// Feedback: 1 Root -> 4 Internal Nodes -> 16 Leaves (4 per internal).
export const BTreeDiagram: React.FC = () => {
  // Configuration
  const root = { x: 200, y: 30 };
  const internalY = 80;
  const leafY = 140;
  const internalNodes = [80, 160, 240, 320]; // 4 nodes evenly spaced

  // Colors for each subtree
  const colors = [
    { fill: "#22D3EE", stroke: "#0E7490" }, // Teal
    { fill: "#FB923C", stroke: "#C2410C" }, // Orange
    { fill: "#A855F7", stroke: "#6B21A8" }, // Purple
    { fill: "#F43F5E", stroke: "#BE123C" }, // Rose
  ];

  return (
    <svg
      viewBox="0 0 400 180"
      width="400"
      height="180"
      style={{ width: '100%', height: 'auto', maxHeight: '180px' }}
      fill="none"
      stroke="currentColor"
      preserveAspectRatio="xMidYMid meet"
    >
      <SharedDefs />

      {/* --- EDGES --- */}
      <g stroke="#9CA3AF" strokeWidth="1.5">
        {/* Root to 4 Internal */}
        {internalNodes.map((x, i) => (
          <line key={`root-edge-${i}`} x1={root.x} y1={root.y} x2={x} y2={internalY} />
        ))}

        {/* Internal to 4 Leaves each */}
        {internalNodes.map((cx, i) => (
          <g key={`leaf-edges-${i}`}>
            {[-24, -8, 8, 24].map((offset, j) => (
              <line key={`edge-${i}-${j}`} x1={cx} y1={internalY} x2={cx + offset} y2={leafY} />
            ))}
          </g>
        ))}
      </g>

      {/* --- NODES --- */}
      {/* Root - Dark/Black */}
      <circle cx={root.x} cy={root.y} r="14" fill="#1F2937" stroke="#374151" strokeWidth="2" filter="url(#shadow-node)" />

      {/* Internal Nodes (Level 1) - Dark/Black */}
      {internalNodes.map((cx, i) => (
        <circle key={`internal-${i}`} cx={cx} cy={internalY} r="12" fill="#1F2937" stroke="#374151" strokeWidth="2" filter="url(#shadow-node)" />
      ))}

      {/* --- LEAF NODES (16 total) --- */}
      {internalNodes.map((cx, i) => {
        const color = colors[i];
        return (
          <g key={`leaf-group-${i}`} transform={`translate(${cx}, ${leafY})`}>
            {/* 4 distinct rounded squares per internal node */}
            {[-24, -8, 8, 24].map((offset, j) => (
              <rect
                key={`leaf-${i}-${j}`}
                x={offset - 5} // Center the 10px rect
                y={-5}        // Center vertically 
                width="10"
                height="10"
                rx="3"
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Be-Tree Diagram
// Feedback: U-Shape "cups", flush arrows from inside buffer, messages inside.
export const BeTreeDiagram: React.FC = () => {
  return (
    <svg
      viewBox="0 0 400 180"
      width="400"
      height="180"
      style={{ width: '100%', height: 'auto', maxHeight: '180px' }}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <SharedDefs />

      {/* --- FLUSH ARROWS (Curved from INSIDE buffer) --- */}
      {/* Root -> Left */}
      <path d="M 185 45 Q 185 80 130 85" stroke="#FBBF24" strokeWidth="2" fill="none" markerEnd="url(#arrow-yellow)" strokeDasharray="4 2" />
      {/* Root -> Right */}
      <path d="M 215 45 Q 215 80 270 85" stroke="#FBBF24" strokeWidth="2" fill="none" markerEnd="url(#arrow-yellow)" strokeDasharray="4 2" />

      {/* Internal -> Leaves */}
      {/* Internal -> Leaves */}
      <path d="M 100 115 Q 100 130 80 140" stroke="#FBBF24" strokeWidth="2" fill="none" markerEnd="url(#arrow-yellow)" strokeDasharray="4 2" />
      <path d="M 300 115 Q 300 130 320 140" stroke="#FBBF24" strokeWidth="2" fill="none" markerEnd="url(#arrow-yellow)" strokeDasharray="4 2" />


      {/* --- NODES (U-SHAPED BUFFERS) --- */}

      {/* Root Node */}
      <g transform="translate(170, 10)">
        {/* U-Shape */}
        <path d="M0 0 L 0 45 Q 0 55 30 55 Q 60 55 60 45 L 60 0" fill="url(#grad-cup)" stroke="#94A3B8" strokeWidth="2" />
        {/* Top Rim (Open) - just side lines hinting opening */}
        <path d="M0 0 L 10 0 M 50 0 L 60 0" stroke="#94A3B8" strokeWidth="2" opacity="0.5" />

        {/* Messages in Buffer */}
        <rect x="10" y="35" width="10" height="10" rx="1" fill="#FBBF24" stroke="white" strokeWidth="0.5" />
        <rect x="22" y="35" width="10" height="10" rx="1" fill="#F472B6" stroke="white" strokeWidth="0.5" />
        <rect x="34" y="35" width="10" height="10" rx="1" fill="#60A5FA" stroke="white" strokeWidth="0.5" />

        <rect x="16" y="23" width="10" height="10" rx="1" fill="#34D399" stroke="white" strokeWidth="0.5" />
        <rect x="28" y="23" width="10" height="10" rx="1" fill="#FBBF24" stroke="white" strokeWidth="0.5" />
      </g>

      {/* Left Child Node */}
      <g transform="translate(80, 80)">
        <path d="M0 0 L 0 35 Q 0 45 25 45 Q 50 45 50 35 L 50 0" fill="url(#grad-cup)" stroke="#94A3B8" strokeWidth="2" />
        {/* Messages */}
        <rect x="8" y="25" width="8" height="8" rx="1" fill="#F59E0B" stroke="white" strokeWidth="0.5" />
        <rect x="18" y="25" width="8" height="8" rx="1" fill="#F59E0B" stroke="white" strokeWidth="0.5" />
        <rect x="32" y="15" width="8" height="8" rx="1" fill="#10B981" stroke="white" strokeWidth="0.5" />
      </g>

      {/* Right Child Node */}
      <g transform="translate(270, 80)">
        <path d="M0 0 L 0 35 Q 0 45 25 45 Q 50 45 50 35 L 50 0" fill="url(#grad-cup)" stroke="#94A3B8" strokeWidth="2" />
        {/* Messages */}
        <rect x="10" y="25" width="8" height="8" rx="1" fill="#A855F7" stroke="white" strokeWidth="0.5" />
        <rect x="20" y="25" width="8" height="8" rx="1" fill="#818CF8" stroke="white" strokeWidth="0.5" />
      </g>


      {/* --- LEAVES (Dense Grid Blocks) --- */}
      {/* Left Block */}
      <g transform="translate(40, 140)">
        <rect width="100" height="25" rx="2" fill="#F97316" stroke="#C2410C" />
        <path d="M0 0 L 100 0 L 100 25 L 0 25 Z" fill="url(#grid-pattern)" opacity="0.3" />
      </g>

      {/* Middle Block */}
      <g transform="translate(150, 140)">
        <rect width="100" height="25" rx="2" fill="#D946EF" stroke="#A21CAF" />
        <path d="M0 0 L 100 0 L 100 25 L 0 25 Z" fill="url(#grid-pattern)" opacity="0.3" />
      </g>

      {/* Right Block */}
      <g transform="translate(260, 140)">
        <rect width="100" height="25" rx="2" fill="#8B5CF6" stroke="#6D28D9" />
        <path d="M0 0 L 100 0 L 100 25 L 0 25 Z" fill="url(#grid-pattern)" opacity="0.3" />
      </g>

    </svg>
  );
};

// LSM-Tree Diagram
// Feedback: "The Recipe" - Tree -> Rack -> Tree (Bridge) -> Rack -> Tree (Bridge) -> Rack
export const LSMTreeDiagram: React.FC = () => {
  return (
    <svg
      viewBox="0 0 400 180"
      width="400"
      height="180"
      style={{ width: '100%', height: 'auto', maxHeight: '180px' }}
      fill="none"
      stroke="currentColor"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Local Patterns for LSM Specifics */}
        <pattern id="lsm-pat-teal-dot" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#0E7490" opacity="0.6" />
        </pattern>
        <pattern id="lsm-pat-blue-grid" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 0 6 L 6 0" stroke="#0369A1" strokeWidth="1" opacity="0.4" />
          <path d="M 0 0 L 6 6" stroke="#0369A1" strokeWidth="1" opacity="0.4" />
        </pattern>
        <pattern id="lsm-pat-purple-grain" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#A855F7" fillOpacity="0.2" />
          <circle cx="1" cy="3" r="0.8" fill="#581C87" opacity="0.5" />
          <circle cx="3" cy="1" r="0.8" fill="#BE185D" opacity="0.5" />
        </pattern>
        <marker id="lsm-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L 6 3 L 0 6 Z" fill="#4B5563" />
        </marker>
        <filter id="shadow-node-lsm">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* --- Layout: Centered at x=200 (Diagram Center) --- */}
      {/* Offsets relative to (0,0) which is effectively (200, 10) in SVG space */}
      <g transform="translate(160, 10)">

        {/* LEVEL 0: Top Tree (Teal) */}
        {/* 1 Parent, 2 Children. Arrow down from center. */}
        <g transform="translate(0, 0)">
          <line x1="0" y1="0" x2="-15" y2="15" stroke="#0E7490" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="15" stroke="#0E7490" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
          <circle cx="-15" cy="15" r="5" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
          <circle cx="15" cy="15" r="5" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />

          {/* Flush Arrow */}
          <line x1="0" y1="15" x2="0" y2="30" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
        </g>

        {/* LEVEL 1: The Transition (Rack + Bridge) */}
        <g transform="translate(0, 30)">
          {/* Rack 1 (Teal Dotted) */}
          <rect x="-40" y="0" width="80" height="12" rx="2" fill="url(#lsm-pat-teal-dot)" stroke="#0E7490" strokeWidth="1.5" />

          {/* Bridge 1 (Teal Tree) - Below Rack 1 */}
          <g transform="translate(0, 20)">
            {/* Parent -> Children */}
            <line x1="0" y1="0" x2="-10" y2="10" stroke="#0E7490" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="10" y2="10" stroke="#0E7490" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="-10" cy="10" r="4" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="10" cy="10" r="4" fill="#0EA5E9" stroke="#0E7490" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />

            {/* Outward Arrows to L2 */}
            <line x1="-10" y1="14" x2="-40" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
            <line x1="10" y1="14" x2="40" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
          </g>
        </g>

        {/* LEVEL 2: The Multiplier (2 Racks + 2 Bridges) */}
        <g transform="translate(0, 75)">
          {/* Racks (Blue Grid) at x=-50 and x=50 approx target */}
          <rect x="-80" y="0" width="60" height="12" rx="2" fill="url(#lsm-pat-blue-grid)" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="20" y="0" width="60" height="12" rx="2" fill="url(#lsm-pat-blue-grid)" stroke="#0369A1" strokeWidth="1.5" />

          {/* Bridges (Purple Trees) below Racks */}
          {/* Left Bridge (-50) */}
          <g transform="translate(-50, 20)">
            <line x1="0" y1="0" x2="-10" y2="10" stroke="#581C87" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="10" y2="10" stroke="#581C87" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="-10" cy="10" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="10" cy="10" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            {/* Arrows to L3 */}
            <line x1="-10" y1="14" x2="-20" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
            <line x1="10" y1="14" x2="10" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
          </g>

          {/* Right Bridge (50) */}
          <g transform="translate(50, 20)">
            <line x1="0" y1="0" x2="-10" y2="10" stroke="#581C87" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="10" y2="10" stroke="#581C87" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="-10" cy="10" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            <circle cx="10" cy="10" r="4" fill="#7C3AED" stroke="#581C87" strokeWidth="1.5" filter="url(#shadow-node-lsm)" />
            {/* Arrows to L3 */}
            <line x1="-10" y1="14" x2="-10" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
            <line x1="10" y1="14" x2="20" y2="35" stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#lsm-arrow)" />
          </g>
        </g>

        {/* LEVEL 3: The Base (4 Racks) */}
        <g transform="translate(0, 120)">
          {/* 4 Racks (Purple Speckled) */}
          {/* Targets from L2: -70, -40 | 40, 70 */}
          <rect x="-85" y="0" width="30" height="10" rx="2" fill="url(#lsm-pat-purple-grain)" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="-45" y="0" width="30" height="10" rx="2" fill="url(#lsm-pat-purple-grain)" stroke="#6D28D9" strokeWidth="1.5" />

          <rect x="25" y="0" width="30" height="10" rx="2" fill="url(#lsm-pat-purple-grain)" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="65" y="0" width="30" height="10" rx="2" fill="url(#lsm-pat-purple-grain)" stroke="#6D28D9" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
};