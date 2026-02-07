import { X } from 'lucide-react'
import styles from './Layout.module.css' 
// Layout.tsx used `import styles from './Layout.module.css'`. 
// Wait, `list_dir` showed `Layout.module.css` might be in `src/decks/template/components/Layout.module.css`?
// Let me double check `Layout.tsx` import.
// It was `import styles from './Layout.module.css'`
// But `list_dir` on `src/decks/template/components` only showed `Slide.tsx`, `Layout.tsx`. 
// Ah, `Layout.module.css` wasn't listed? 
// Wait, step 18 `list_dir` of `src/decks/template` showed `components`.
// Let me re-check `list_dir` output of `src/decks/template/components`.

// Actually, I can just use the same import if it is co-located.
// If `Layout.module.css` is in the same folder, I'll use that.
// But I need to pass props.

interface SlideNavigationModalProps {
  totalSlides: number
  currentSlide: number
  slideNames: string[]
  onClose: () => void
  onGoToSlide: (index: number) => void
}

export function SlideNavigationModal({
  totalSlides,
  currentSlide,
  slideNames,
  onClose,
  onGoToSlide
}: SlideNavigationModalProps) {
  return (
    <div className={styles.slideNavModal} onClick={onClose}>
      <div className={styles.slideNavContent} onClick={e => e.stopPropagation()}>
        <div className={styles.slideNavHeader}>
          <h3>Go to Slide</h3>
          <button className={styles.slideNavClose} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.slideNavList}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              className={`${styles.slideNavItem} ${i === currentSlide ? styles.active : ''}`}
              onClick={() => onGoToSlide(i)}
            >
              <span className={styles.slideNavNumber}>{i + 1}</span>
              <span className={styles.slideNavName}>{slideNames[i] || `Slide ${i + 1}`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
