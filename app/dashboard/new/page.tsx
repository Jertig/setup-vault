'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TAGS = ['scalping', 'swing', 'breakout', 'reversal', 'FVG', 'order block', 'liquidity grab']
const PAIRS = ['BTC', 'ETH', 'SOL', 'All']
const CONDITIONS = ['trending', 'ranging', 'volatile', 'any']

export default function NewSetupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    pair: 'All',
    market_condition: 'any',
    entry_rules: '',
    exit_rules: '',
    tags: [] as string[],
    win_rate: '',
    total_trades: '',
    notes: '',
  })

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
    const { error } = await supabase.from('setups').insert({
      user_id: user!.id,
      name: form.name,
      pair: form.pair,
      market_condition: form.market_condition,
      entry_rules: form.entry_rules,
      exit_rules: form.exit_rules,
      tags: form.tags,
      win_rate: form.win_rate ? parseFloat(form.win_rate) : null,
      total_trades: form.total_trades ? parseInt(form.total_trades) : 0,
      notes: form.notes,
    })
    setLoading(false)
    if (error) return alert(error.message)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-zinc-400 hover:text-white">← Back</button>
        <h1 className="text-2xl font-bold">New Setup</h1>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Nama Setup *</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. FVG Reversal" className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Pair</label>
            <select value={form.pair} onChange={e => setForm(f => ({ ...f, pair: e.target.value }))}
              className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none">
              {PAIRS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Market Condition</label>
            <select value={form.market_condition} onChange={e => setForm(f => ({ ...f, market_condition: e.target.value }))}
              className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none">
              {CONDITIONS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Entry Rules</label>
          <textarea value={form.entry_rules} onChange={e => setForm(f => ({ ...f, entry_rules: e.target.value }))}
            rows={4} placeholder="Describe your entry conditions..." className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none resize-none" />
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Exit Rules</label>
          <textarea value={form.exit_rules} onChange={e => setForm(f => ({ ...f, exit_rules: e.target.value }))}
            rows={4} placeholder="Describe your exit conditions..." className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none resize-none" />
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${form.tags.includes(tag) ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-700 hover:border-zinc-500'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Win Rate (%)</label>
            <input type="number" min="0" max="100" value={form.win_rate}
              onChange={e => setForm(f => ({ ...f, win_rate: e.target.value }))}
              placeholder="e.g. 65" className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Total Trades</label>
            <input type="number" min="0" value={form.total_trades}
              onChange={e => setForm(f => ({ ...f, total_trades: e.target.value }))}
              placeholder="e.g. 20" className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Notes</label>
          <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3} placeholder="Additional notes..." className="w-full bg-zinc-900 px-4 py-2 rounded-lg outline-none resize-none" />
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-3 rounded-lg font-medium transition-colors">
          {loading ? 'Saving...' : 'Save Setup'}
        </button>
      </div>
    </div>
  )
}