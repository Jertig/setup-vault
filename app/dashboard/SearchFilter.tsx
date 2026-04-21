'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function SearchFilter({ allTags, currentTag, currentQ }: {
  allTags: string[]
  currentTag?: string
  currentQ?: string
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
    <div className="flex flex-col gap-3">
      <input
        defaultValue={currentQ}
        onChange={e => updateParam('q', e.target.value || null)}
        placeholder="Search setups..."
        className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none text-white placeholder:text-zinc-500"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParam('tag', null)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${!currentTag ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-700 hover:border-zinc-500'}`}>
          All
        </button>
        {allTags.map(tag => (
          <button key={tag}
            onClick={() => updateParam('tag', currentTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${currentTag === tag ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-700 hover:border-zinc-500'}`}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}