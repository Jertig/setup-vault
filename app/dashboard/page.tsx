import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SearchFilter from './SearchFilter'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; sort?: string }>
}) {
  const { q, tag, sort } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  let query = supabase.from('setups').select('*').eq('user_id', user.id)
  if (q) query = query.ilike('name', `%${q}%`)
  if (tag) query = query.contains('tags', [tag])
  if (sort === 'winrate') query = query.order('win_rate', { ascending: false })
  else if (sort === 'trades') query = query.order('total_trades', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data: setups } = await query

  const { data: allSetups } = await supabase.from('setups').select('*').eq('user_id', user.id)
  const totalSetups = allSetups?.length || 0
  const setupsWithWR = allSetups?.filter(s => s.win_rate) || []
  const avgWR = setupsWithWR.length > 0
    ? Math.round(setupsWithWR.reduce((acc, s) => acc + parseFloat(s.win_rate), 0) / setupsWithWR.length)
    : null
  const bestSetup = setupsWithWR.length > 0
    ? setupsWithWR.reduce((best, s) => parseFloat(s.win_rate) > parseFloat(best.win_rate) ? s : best)
    : null

  const allTags = ['scalping', 'swing', 'breakout', 'reversal', 'FVG', 'order block', 'liquidity grab']

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8' }}>

      <nav style={{ background: 'white', borderBottom: '1px solid #ebebeb', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>S</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>Setup Vault</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#888' }}>{user.email}</span>
          <LogoutButton />
          <Link href="/dashboard/new" style={{ background: '#6366f1', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
            + New Setup
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111', margin: '0 0 4px' }}>My Setups</h1>
          <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>{totalSetups} setup{totalSetups !== 1 ? 's' : ''} in your library</p>
        </div>

        {totalSetups > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ebebeb', padding: '20px 24px' }}>
              <p style={{ fontSize: '12px', color: '#aaa', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Total Setups</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#111', margin: 0 }}>{totalSetups}</p>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ebebeb', padding: '20px 24px' }}>
              <p style={{ fontSize: '12px', color: '#aaa', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Avg Win Rate</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: avgWR ? '#22c55e' : '#ccc', margin: 0 }}>{avgWR ? `${avgWR}%` : '—'}</p>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ebebeb', padding: '20px 24px' }}>
              <p style={{ fontSize: '12px', color: '#aaa', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Best Setup</p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#6366f1', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bestSetup ? `${bestSetup.name} (${bestSetup.win_rate}%)` : '—'}</p>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ebebeb', padding: '20px 24px' }}>
              <p style={{ fontSize: '12px', color: '#aaa', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Tracked</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#111', margin: 0 }}>{setupsWithWR.length}<span style={{ fontSize: '14px', color: '#aaa', fontWeight: '400' }}> / {totalSetups}</span></p>
            </div>
          </div>
        )}

        <SearchFilter allTags={allTags} currentTag={tag} currentQ={q} currentSort={sort} />

        {setups?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '16px', color: '#888', margin: '0 0 4px' }}>No setups found</p>
            <p style={{ fontSize: '14px', color: '#aaa', margin: 0 }}>Click "+ New Setup" to add your first one</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {setups?.map(setup => (
            <Link key={setup.id} href={`/dashboard/${setup.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', overflow: 'hidden', cursor: 'pointer' }}>
                {setup.screenshot_url ? (
                  <img src={setup.screenshot_url} alt={setup.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '140px', background: '#f8f8f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '28px', opacity: 0.3 }}>📈</span>
                  </div>
                )}
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#111' }}>{setup.name}</span>
                    <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: '11px', padding: '3px 8px', borderRadius: '5px', fontWeight: '500' }}>{setup.pair}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 10px', textTransform: 'capitalize' }}>{setup.market_condition}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {setup.tags?.map((t: string) => (
                      <span key={t} style={{ background: '#eef2ff', color: '#6366f1', fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '500' }}>{t}</span>
                    ))}
                  </div>
                  {setup.win_rate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></div>
                      <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: '600' }}>{setup.win_rate}% WR</span>
                      <span style={{ fontSize: '13px', color: '#aaa' }}>· {setup.total_trades} trades</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action={async () => {
      'use server'
      const { createClient } = await import('@/lib/supabase/server')
      const { redirect } = await import('next/navigation')
      const supabase = await createClient()
      await supabase.auth.signOut()
      redirect('/login')
    }}>
      <button type="submit" style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', cursor: 'pointer', padding: 0 }}>
        Sign out
      </button>
    </form>
  )
}