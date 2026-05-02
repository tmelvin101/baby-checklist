'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { categories, type ChecklistItem } from '@/data/categories'
import styles from './Checklist.module.css'

type Filter = 'all' | 'must' | 'reuse' | 'new'

function applyFilter(items: ChecklistItem[], filter: Filter): ChecklistItem[] {
  if (filter === 'must') return items.filter(i => i.must)
  if (filter === 'reuse') return items.filter(i => i.reuse)
  if (filter === 'new') return items.filter(i => !i.reuse)
  return items
}

const TOTAL_ITEMS = categories.flatMap(c => c.items).length

export default function Checklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [filter, setFilter] = useState<Filter>('all')
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(c => [c.id, true]))
  )

  useEffect(() => {
    // Load current state
    supabase
      .from('checklist_items')
      .select('item_id, checked')
      .then(({ data }) => {
        if (!data) return
        const state: Record<number, boolean> = {}
        data.forEach((row: { item_id: number; checked: boolean }) => {
          state[row.item_id] = row.checked
        })
        setChecked(state)
      })

    // Subscribe to real-time updates from anyone else on the page
    const channel = supabase
      .channel('checklist_realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'checklist_items' },
        (payload) => {
          const row = payload.new as { item_id: number; checked: boolean }
          setChecked(prev => ({ ...prev, [row.item_id]: row.checked }))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleToggle = async (itemId: number) => {
    const next = !checked[itemId]
    setChecked(prev => ({ ...prev, [itemId]: next }))
    await supabase
      .from('checklist_items')
      .update({ checked: next, updated_at: new Date().toISOString() })
      .eq('item_id', itemId)
  }

  const toggleCat = (id: string) =>
    setOpenCats(prev => ({ ...prev, [id]: !prev[id] }))

  const checkedCount = Object.values(checked).filter(Boolean).length
  const pct = TOTAL_ITEMS > 0 ? Math.round((checkedCount / TOTAL_ITEMS) * 100) : 0

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerEmoji}>👶🌸</div>
        <h1>Baby Girl Checklist</h1>
        <p>Second baby prep — with what you can reuse from your son ♻️</p>
      </div>

      <div className={styles.container}>
        {/* Progress bar */}
        <div className={styles.progressCard}>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>Progress</span>
            <span className={styles.progressCount}>
              {checkedCount} / {TOTAL_ITEMS} ({pct}%)
            </span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#fef3c7', border: '2px solid #f59e0b' }} />
            ⭐ Must-Have
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#d1fae5', border: '2px solid #10b981' }} />
            ♻️ Reusable from son
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#fff', border: '2px solid #d1d5db' }} />
            Nice-to-Have
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {(['all', 'must', 'reuse', 'new'] as const).map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Items'
                : f === 'must' ? '⭐ Must-Haves'
                : f === 'reuse' ? '♻️ Reusable'
                : '🛍️ Buy New'}
            </button>
          ))}
        </div>

        {/* Categories */}
        {categories.map(cat => {
          const visible = applyFilter(cat.items, filter)
          if (visible.length === 0) return null
          const isOpen = openCats[cat.id]
          const catCheckedCount = cat.items.filter(i => checked[i.id]).length

          return (
            <div key={cat.id} className={styles.category}>
              <button
                className={`${styles.categoryHeader} ${isOpen ? styles.open : ''}`}
                style={{ '--cat-color': cat.color } as React.CSSProperties}
                onClick={() => toggleCat(cat.id)}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catLabel}>{cat.label}</span>
                <span className={styles.catCount}>{catCheckedCount}/{cat.items.length}</span>
                <span className={`${styles.catChevron} ${isOpen ? styles.open : ''}`}>›</span>
              </button>

              {isOpen && (
                <div>
                  {visible.map(item => (
                    <div
                      key={item.id}
                      className={[
                        styles.itemRow,
                        item.must ? styles.isMust : '',
                        item.reuse && !item.must ? styles.isReuse : '',
                        checked[item.id] ? styles.isChecked : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => handleToggle(item.id)}
                    >
                      <div
                        className={[
                          styles.checkbox,
                          item.must ? styles.isMust : '',
                          checked[item.id] ? styles.isChecked : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {checked[item.id] && (
                          <span className={styles.checkboxTick}>✓</span>
                        )}
                      </div>
                      <div className={styles.itemContent}>
                        <div
                          className={`${styles.itemName} ${checked[item.id] ? styles.isChecked : ''}`}
                        >
                          {item.name}
                          {item.must && (
                            <span className={`${styles.badge} ${styles.badgeMust}`}>⭐ Must</span>
                          )}
                          {item.reuse && (
                            <span className={`${styles.badge} ${styles.badgeReuse}`}>♻️ Reuse</span>
                          )}
                        </div>
                        {item.note && (
                          <div className={styles.itemNote}>{item.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className={styles.footerNote}>
          Every baby is different 💕 Use this as a guide, not a rule.
        </div>
      </div>
    </>
  )
}
