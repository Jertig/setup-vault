'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ShareButton({ setupId, isPublic, publicSlug }: {
  setupId: string
  isPublic: boolean
  publicSlug: string | null
}) {
  const [shared, setShared] = useState(isPublic)
  const [slug, setSlug] = useState(publicSlug)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  async function toggleShare() {
    setLoading(true)
    if (!shared) {
      const newSlug = Math.random().toString(36).substring(2, 10)
      await supabase.from('setups').update({ is_public: true, public_slug: newSlug }).eq('id', setupId)
      setSlug(newSlug)
      setShared(true)
    } else {
      await supabase.from('setups').update({ is_public: false }).eq('id', setupId)
      setShared(false)
    }
    setLoading(false)
  }

  async function copyLink() {
    const url = `${window.location.origin}/s/${slug}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button onClick={toggleShare} disabled={loading}
        style={{ background: shared ? '#eef2ff' : '#f3f4f6', color: shared ? '#6366f1' : '#374151', padding: '9px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
        {loading ? '...' : shared ? '🔗 Shared' : 'Share'}
      </button>
      {shared && slug && (
        <button onClick={copyLink}
          style={{ background: copied ? '#dcfce7' : '#f3f4f6', color: copied ? '#16a34a' : '#374151', padding: '9px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      )}
    </div>
  )
}