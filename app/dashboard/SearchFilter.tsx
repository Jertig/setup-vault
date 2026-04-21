'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function SearchFilter({ allTags, currentTag, currentQ, currentSort }: {
  allTags: string[]
  currentTag?: string
  currentQ?: string
  currentSort?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/dashboard?${params.toString()}`)
  }, [searchParams, router])

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            defaultValue={currentQ}
            onChange={e => updateParam('q', e.target.value || null)}
            placeholder="Search setups..."
            style={{ width: '100%', padding: '11px 14px 11px 40px', border: '1px solid #e5e5e5', borderRadius: '10px', fontSize: '14px', outline: 'none', background: 'white', color: '#111' }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#e5e5e5'}
          />
        </div>
        <select
          value={currentSort || 'newest'}
          onChange={e => updateParam('sort', e.target.value === 'newest' ? null : e.target.value)}
          style={{ padding: '11px 14px', border: '1px solid #e5e5e5', borderRadius: '10px', fontSize: '14px', outline: 'none', background: 'white', color: '#111', cursor: 'pointer' }}>
          <option value="newest">Newest</option>
          <option value="winrate">Win Rate ↓</option>
          <option value="trades">Most Trades</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        <button onClick={() => updateParam('tag', null)}
          style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', border: 'none', cursor: 'pointer', background: !currentTag ? '#6366f1' : '#f3f4f6', color: !currentTag ? 'white' : '#6b7280' }}>
          All
        </button>
        {allTags.map(tag => (
          <button key={tag} onClick={() => updateParam('tag', currentTag === tag ? null : tag)}
            style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', border: 'none', cursor: 'pointer', background: currentTag === tag ? '#6366f1' : '#f3f4f6', color: currentTag === tag ? 'white' : '#6b7280' }}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}