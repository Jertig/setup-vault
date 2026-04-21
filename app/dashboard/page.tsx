import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SearchFilter from './SearchFilter'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>
}) {
  const { q, tag } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  let query = supabase.from('setups').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  if (q) query = query.ilike('name', `%${q}%`)
  if (tag) query = query.contains('tags', [tag])

  const { data: setups } = await query

  const allTags = ['scalping', 'swing', 'breakout', 'reversal', 'FVG', 'order block', 'liquidity grab']

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Setup Vault</h1>
          <Link href="/dashboard/new"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + New Setup
          </Link>
        </div>

        <SearchFilter allTags={allTags} currentTag={tag} currentQ={q} />

        {setups?.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg">No setups found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {setups?.map(setup => (
            <Link key={setup.id} href={`/dashboard/${setup.id}`}
              className="bg-zinc-900 rounded-xl p-5 hover:bg-zinc-800 transition-colors">
                {setup.screenshot_url && (
  <img src={setup.screenshot_url} alt={setup.name} className="w-full h-32 object-cover rounded-lg mb-3" />
)}
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-semibold text-white">{setup.name}</h2>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{setup.pair}</span>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{setup.market_condition}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {setup.tags?.map((t: string) => (
                  <span key={t} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              {setup.win_rate && (
                <p className="text-sm text-green-400">{setup.win_rate}% WR · {setup.total_trades} trades</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}