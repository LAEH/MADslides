interface SlideCardProps {
  title: string
  slideIndex: number
  projectColor: string
  section: string
}

export default function SlideCard({
  title,
  slideIndex,
  projectColor,
  section,
}: SlideCardProps) {
  return (
    <div className="aspect-16-9">
      <div
        className="absolute inset-0 flex flex-col justify-between p-5"
        style={{
          background: `linear-gradient(135deg, ${projectColor} 0%, ${projectColor}99 40%, ${projectColor}44 100%)`,
        }}
      >
        {/* Top row: section + index */}
        <div className="flex items-start justify-between">
          <span className="text-white/60 text-2xs font-mono uppercase tracking-wider">
            {section}
          </span>
          <span className="text-white/40 text-xs font-mono font-bold">
            #{slideIndex}
          </span>
        </div>

        {/* Title */}
        <div>
          <h4 className="text-white font-bold text-sm leading-tight line-clamp-2">
            {title}
          </h4>
        </div>
      </div>
    </div>
  )
}
