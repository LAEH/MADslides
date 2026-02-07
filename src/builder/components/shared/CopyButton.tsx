import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export default function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={`copy-btn ${copied ? 'copied' : ''} ${className}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? 'Copied!' : label || text}</span>
    </button>
  )
}
