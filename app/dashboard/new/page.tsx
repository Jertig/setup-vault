'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TAGS = ['scalping', 'swing', 'breakout', 'reversal', 'FVG', 'order block', 'liquidity grab']
const PAIRS = ['BTC', 'ETH', 'SOL', 'All']
const CONDITIONS = ['trending', 'ranging', 'volatile', 'any']

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1px solid #e5e5e5',
  borderRadius: '8px', fontSize: '15px', outline: 'none',
  background: '#fafafa', color: '#111', fontFamily: 'inherit'
}

const labelStyle = {
  display: 'block', fontSize: '13px', fontWeight: '500' as const,
  color: '#444', marginBottom: '6px'
}

export default function NewSetupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', pair: 'All', market_condition: 'any',
    entry_rules: '', exit_rules: '', tags: [] as string[],
    win_rate: '', total_trades: '', notes: '',
  })

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function toggleTag(tag: string) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag]
    }))
  }

  async function handleSubmit() {
    if (!form.name) return alert('Nama setup wajib diisi')
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    let screenshot_url = null

    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `${user!.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('screenshots').upload(path, imageFile)
      if (uploadError) { setLoading(false); return alert('Upload failed: ' + uploadError.message) }
      const { data: { publicUrl } } = supabase.storage.from('screenshots').getPublicUrl(path)
      screenshot_url = publicUrl
    }

    const { error } = await supabase.from('setups').insert({
      user_id: user!.id, name: form.name, pair: form.pair,
      market_condition: form.market_condition, entry_rules: form.entry_rules,
      exit_rules: form.exit_rules, tags: form.tags,
      win_rate: form.win_rate ? parseFloat(form.win_rate) : null,
      total_trades: form.total_trades ? parseInt(form.total_trades) : 0,
      notes: form.notes, screenshot_url,
    })
    setLoading(false)
    if (error) return alert(error.message)
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>

      <nav style={{ background: 'white', borderBottom: '1px solid #ebebeb', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>S</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>Setup Vault</span>
        </div>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', cursor: 'pointer' }}>← Back</button>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '36px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111', margin: '0 0 24px' }}>New Setup</h1>

        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={labelStyle}>Nama Setup *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. FVG Reversal" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Pair</label>
              <select value={form.pair} onChange={e => setForm(f => ({ ...f, pair: e.target.value }))}
                style={{ ...inputStyle }}>
                {PAIRS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Market Condition</label>
              <select value={form.market_condition} onChange={e => setForm(f => ({ ...f, market_condition: e.target.value }))}
                style={{ ...inputStyle }}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Screenshot Chart</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              style={{ ...inputStyle, padding: '9px 14px' }} />
            {imagePreview && (
              <img src={imagePreview} alt="preview" style={{ marginTop: '12px', borderRadius: '10px', maxHeight: '200px', objectFit: 'cover', width: '100%', border: '1px solid #ebebeb' }} />
            )}
          </div>

          <div>
            <label style={labelStyle}>Entry Rules</label>
            <textarea value={form.entry_rules} onChange={e => setForm(f => ({ ...f, entry_rules: e.target.value }))}
              rows={4} placeholder="Describe your entry conditions..."
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
          </div>

          <div>
            <label style={labelStyle}>Exit Rules</label>
            <textarea value={form.exit_rules} onChange={e => setForm(f => ({ ...f, exit_rules: e.target.value }))}
              rows={4} placeholder="Describe your exit conditions..."
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
          </div>

          <div>
            <label style={labelStyle}>Tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)} type="button"
                  style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', border: 'none', cursor: 'pointer', background: form.tags.includes(tag) ? '#6366f1' : '#f3f4f6', color: form.tags.includes(tag) ? 'white' : '#6b7280' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Win Rate (%)</label>
              <input type="number" min="0" max="100" value={form.win_rate}
                onChange={e => setForm(f => ({ ...f, win_rate: e.target.value }))}
                placeholder="e.g. 65" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
            </div>
            <div>
              <label style={labelStyle}>Total Trades</label>
              <input type="number" min="0" value={form.total_trades}
                onChange={e => setForm(f => ({ ...f, total_trades: e.target.value }))}
                placeholder="e.g. 20" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3} placeholder="Additional notes..."
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: '13px', background: loading ? '#a5b4fc' : '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Saving...' : 'Save Setup'}
          </button>

        </div>
      </div>
    </div>
  )
}