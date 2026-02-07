import { useMemo } from 'react'
import {
  ScatterChart, Scatter, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts'
import { CheckCircle2 } from 'lucide-react'
import styles from './AIDemandCharts.module.css'

// ═══════════════════════════════════════════════════════════════════════════
// CHART 1: MODEL SIZE - Data Points
// Labels should be ABOVE dots, trend line passes UNDERNEATH cleanly
// ═══════════════════════════════════════════════════════════════════════════
const modelSizeData = [
  { label: 'CLIP-ViT', year: 2021.2, size: 0.086 },
  { label: 'GPT-Neo 1.3B', year: 2021.5, size: 1.3 },
  { label: 'PaLM-2', year: 2022.4, size: 8.0 },
  { label: 'Llama-13B', year: 2022.9, size: 13.0 },
  { label: 'Llama-2 70B', year: 2023.6, size: 70.0 },
  { label: 'Mixtral 8x22B', year: 2024.1, size: 140.0 },
  { label: 'Qwen-72B', year: 2024.5, size: 72.0 },
  { label: 'Qwen3-480B', year: 2024.8, size: 480.0 },
  { label: 'Kimi-K2 1T', year: 2025.0, size: 1000.0 },
]

// ═══════════════════════════════════════════════════════════════════════════
// CHART 2: TEST-TIME SCALING - Scatter Data + Trend Lines
// Clear SPLIT between Non-Reasoning (grey baseline) and Reasoning (red vertical)
// ═══════════════════════════════════════════════════════════════════════════
const generateTestTimeData = () => {
  const nonReasoning: Array<{ year: number; tokens: number; type: string }> = []
  const reasoning: Array<{ year: number; tokens: number; type: string }> = []

  // Non-reasoning: Flat/Linear slope at the bottom (Y=200 to Y=2000)
  // Spread more across time, visible baseline
  for (let i = 0; i < 60; i++) {
    const year = 2023 + Math.random() * 1.5
    const tokens = 200 + Math.random() * 600 + (year - 2023) * 800
    nonReasoning.push({ year, tokens: Math.min(tokens, 2500), type: 'non-reasoning' })
  }

  // Reasoning: Exponential spike starting 2024.2 (Y=3000 to Y=80000)
  // Clear separation from non-reasoning cluster
  for (let i = 0; i < 40; i++) {
    const year = 2024.2 + Math.random() * 1.0
    const progress = (year - 2024.2) / 1.0
    const base = 3000 + Math.pow(progress, 1.2) * 75000
    const tokens = base + Math.random() * base * 0.25
    reasoning.push({ year, tokens: Math.min(tokens, 90000), type: 'reasoning' })
  }

  return { nonReasoning, reasoning }
}

// ═══════════════════════════════════════════════════════════════════════════
// CHART 3: TOKEN COST - 3 FAMILIES ONLY (Clean Staircase Lines)
// Exactly 3 parallel staircases going down, no crossing or broken segments
// ═══════════════════════════════════════════════════════════════════════════

// Line 1: GPT-4 Family (Dark Black #111) - TOP LINE
// Path: $36 → $10 (GPT-4 Turbo) → $5 (GPT-4o)
const gpt4Family = [
  { year: 2022.2, cost: 36.00, label: 'GPT-4' },
  { year: 2023.8, cost: 36.00, label: null },
  { year: 2023.8, cost: 10.00, label: 'GPT-4 Turbo' },
  { year: 2024.4, cost: 10.00, label: null },
  { year: 2024.4, cost: 5.00, label: 'GPT-4o' },
  { year: 2025.5, cost: 5.00, label: null },
]

// Line 2: GPT-3.5 Family (Medium Grey #888) - MIDDLE LINE
// Path: $20 → $2 (GPT-3.5 Turbo) → $0.50
const gpt35Family = [
  { year: 2022.0, cost: 20.00, label: 'GPT-3.5' },
  { year: 2022.9, cost: 20.00, label: null },
  { year: 2022.9, cost: 2.00, label: 'GPT-3.5 Turbo' },
  { year: 2024.0, cost: 2.00, label: null },
  { year: 2024.0, cost: 0.50, label: 'GPT-3.5 Latest' },
  { year: 2025.5, cost: 0.50, label: null },
]

// Line 3: Llama 8B Family (Brand Red #ED2738) - BOTTOM LINE
// Path: $0.20 → $0.10 → $0.02
const llamaFamily = [
  { year: 2023.2, cost: 0.20, label: 'Llama 8B' },
  { year: 2023.9, cost: 0.20, label: null },
  { year: 2023.9, cost: 0.10, label: 'Llama 3' },
  { year: 2024.6, cost: 0.10, label: null },
  { year: 2024.6, cost: 0.02, label: 'Llama 3.1' },
  { year: 2025.5, cost: 0.02, label: null },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{data.label || data.type || 'Data Point'}</p>
        {data.size && <p>{data.size >= 1 ? `${data.size}B` : `${Math.round(data.size * 1000)}M`} parameters</p>}
        {data.tokens && <p>{Math.round(data.tokens).toLocaleString()} tokens</p>}
        {data.cost && <p>${data.cost.toFixed(2)}/1M tokens</p>}
      </div>
    )
  }
  return null
}

// Custom dot renderer for Token Cost chart - only show dots with labels
const renderTokenCostDot = (color: string, fontSize: number = 9) => (props: any) => {
  const { cx, cy, payload } = props
  if (!payload.label) return null

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={color} stroke="#FFFFFF" strokeWidth={2} />
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fill={color}
        fontSize={fontSize}
        fontWeight={600}
      >
        {payload.label}
      </text>
    </g>
  )
}

export default function AIDemandCharts() {
  const testTimeData = useMemo(() => generateTestTimeData(), [])

  return (
    <div className={styles.chartsContainer}>
      {/* ═══════════════════════════════════════════════════════════════════
          CHART 1: MODEL SIZE - Labels ABOVE dots, trend line BEHIND
          Trend line steeper: through GPT-Neo (bottom-left) to Kimi-K2 (top-right)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Model Size Growing</h3>
        <p className={styles.chartSubtitle}>10X Parameters Per Year</p>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 40, right: 60, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#E0E0E0" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="year"
                type="number"
                domain={[2021, 2025.5]}
                tickFormatter={(v) => Math.floor(v).toString()}
                tick={{ fill: '#555555', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
              />
              <YAxis
                dataKey="size"
                type="number"
                scale="log"
                domain={[0.05, 2000]}
                tickFormatter={(v) => v >= 1 ? `${v}B` : `${Math.round(v * 1000)}M`}
                tick={{ fill: '#555555', fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
                ticks={[0.1, 1, 10, 100, 1000]}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Trend line - drawn FIRST (behind dots) - STEEPER angle */}
              <ReferenceLine
                segment={[{ x: 2021.5, y: 1.3 }, { x: 2025.0, y: 1000 }]}
                stroke="#ED2738"
                strokeWidth={3}
                strokeOpacity={0.4}
              />
              {/* Scatter points - drawn AFTER (on top) with labels ABOVE */}
              <Scatter
                data={modelSizeData}
                fill="#ED2738"
                shape={(props: any) => {
                  const { cx, cy, payload } = props
                  const isHighlight = payload.label === 'Kimi-K2 1T'
                  return (
                    <g>
                      {/* White background behind label for clarity */}
                      <rect
                        x={cx - 35}
                        y={cy - 28}
                        width={70}
                        height={14}
                        fill="#FFFFFF"
                        rx={2}
                      />
                      {/* Data label - ABOVE the dot */}
                      <text
                        x={cx}
                        y={cy - 18}
                        textAnchor="middle"
                        fill={isHighlight ? '#ED2738' : '#333333'}
                        fontSize={isHighlight ? 11 : 9}
                        fontWeight={isHighlight ? 700 : 500}
                      >
                        {payload.label}
                      </text>
                      {/* Dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHighlight ? 8 : 5}
                        fill={isHighlight ? '#ED2738' : '#FFFFFF'}
                        stroke="#ED2738"
                        strokeWidth={2}
                      />
                    </g>
                  )
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.needCard}>
          <CheckCircle2 size={18} className={styles.needCheck} />
          <p>Needs <strong>10X Throughput</strong> for Training/Checkpoint and Model Load</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CHART 2: TEST-TIME SCALING - Clear SPLIT between clusters
          Grey: Thick visible baseline (slow growth)
          Red: Starts at split point, shoots up vertically
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Test-Time Scaling "Thinking"</h3>
        <p className={styles.chartSubtitle}>5X Tokens Per Year</p>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#E0E0E0" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="year"
                type="number"
                domain={[2023, 2025.5]}
                tickFormatter={(v) => Math.floor(v).toString()}
                tick={{ fill: '#555555', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
              />
              <YAxis
                dataKey="tokens"
                type="number"
                scale="log"
                domain={[100, 100000]}
                tick={{ fill: '#555555', fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
                ticks={[100, 1000, 10000, 100000]}
                tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v.toString()}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* TREND LINE A: Non-Reasoning - THICK Grey baseline, slow linear growth */}
              <ReferenceLine
                segment={[{ x: 2023.0, y: 300 }, { x: 2024.8, y: 2000 }]}
                stroke="#888888"
                strokeWidth={4}
              />

              {/* TREND LINE B: Reasoning - Red, nearly VERTICAL from split point */}
              <ReferenceLine
                segment={[{ x: 2024.2, y: 3000 }, { x: 2025.2, y: 80000 }]}
                stroke="#ED2738"
                strokeWidth={4}
              />

              {/* Non-Reasoning cluster - Grey dots */}
              <Scatter
                name="Non-Reasoning"
                data={testTimeData.nonReasoning}
                fill="#AAAAAA"
              />
              {/* Reasoning cluster - Red dots */}
              <Scatter
                name="Reasoning"
                data={testTimeData.reasoning}
                fill="#ED2738"
              />
            </ScatterChart>
          </ResponsiveContainer>
          {/* Badges positioned near trend lines */}
          <div className={styles.chartBadges}>
            <span className={styles.badgeNonReasoning}>Non-Reasoning</span>
            <span className={styles.badgeReasoning}>Reasoning</span>
          </div>
        </div>
        <p className={styles.chartSource}>Source: EPOCH AI</p>
        <div className={styles.needCard}>
          <CheckCircle2 size={18} className={styles.needCheck} />
          <p>Needs <strong>sub ms latency</strong> at million thread concurrency</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CHART 3: TOKEN COST - 3 CLEAN STAIRCASE LINES ONLY
          Line 1: GPT-4 (Dark Grey) - Top
          Line 2: GPT-3.5 (Medium Grey) - Middle
          Line 3: Llama (Bright Red) - Bottom
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Token Cost</h3>
        <p className={styles.chartSubtitleGreen}>10X Cheaper Per Year</p>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart margin={{ top: 35, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#E0E0E0" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="year"
                type="number"
                domain={[2022, 2025.5]}
                tickFormatter={(v) => Math.floor(v).toString()}
                tick={{ fill: '#555555', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
                allowDuplicatedCategory={false}
              />
              <YAxis
                type="number"
                scale="log"
                domain={[0.01, 50]}
                tick={{ fill: '#555555', fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: '#CCCCCC' }}
                tickLine={{ stroke: '#CCCCCC' }}
                ticks={[0.01, 0.1, 1, 10]}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Line 1: GPT-4 Family - Dark Black (TOP LINE) */}
              <Line
                data={gpt4Family}
                dataKey="cost"
                type="stepAfter"
                stroke="#111111"
                strokeWidth={3}
                dot={renderTokenCostDot('#111111', 8)}
                activeDot={{ r: 6, fill: '#111111' }}
                name="GPT-4 Family"
              />

              {/* Line 2: GPT-3.5 Family - Medium Grey (MIDDLE LINE) */}
              <Line
                data={gpt35Family}
                dataKey="cost"
                type="stepAfter"
                stroke="#888888"
                strokeWidth={3}
                dot={renderTokenCostDot('#888888', 8)}
                activeDot={{ r: 6, fill: '#888888' }}
                name="GPT-3.5 Family"
              />

              {/* Line 3: Llama Family - Bright Red (BOTTOM LINE) */}
              <Line
                data={llamaFamily}
                dataKey="cost"
                type="stepAfter"
                stroke="#ED2738"
                strokeWidth={3}
                dot={renderTokenCostDot('#ED2738', 8)}
                activeDot={{ r: 6, fill: '#ED2738' }}
                name="Llama Family"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className={styles.chartSource}>Source: Artificial Analysis</p>
        <div className={styles.needCard}>
          <CheckCircle2 size={18} className={styles.needCheck} />
          <p>Needs <strong>disaggregated, optimized KV Cache Fabric</strong></p>
        </div>
      </div>
    </div>
  )
}
