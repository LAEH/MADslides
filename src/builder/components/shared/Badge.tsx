interface BadgeProps {
  project: string
  label?: string
}

const PROJECT_LABELS: Record<string, string> = {
  exascaler: 'EXAScaler',
  strategy: 'Strategy',
  tomer: 'Infinia',
  template: 'Template',
}

export default function Badge({ project, label }: BadgeProps) {
  return (
    <span className={`project-badge badge-${project}`}>
      {label || PROJECT_LABELS[project] || project}
    </span>
  )
}
