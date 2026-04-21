import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PublicSetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: setup } = await supabase
    .from('setups')
    .select('*')
    .eq('public_slug', slug)
    .eq('is_public', true)
    .single()

  if (!setup) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8' }}>

      <nav style={{ background: 'white', borderBottom: '1px solid #ebebeb', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>S</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>Setup Vault</span>
        </div>
        <Link href="/signup" style={{ background: '#6366f1', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
          Sign up free
        </Link>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '36px 24px' }}>

        <div style={{ background: '#eef2ff', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '13px', color: '#6366f1', margin: 0 }}>Shared via Setup Vault</p>
          <Link href="/signup" style={{ fontSize: '13px', color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>Build your own →</Link>
        </div>

        {setup.screenshot_url && (
          <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '24px', border: '1px solid #ebebeb' }}>
            <img src={setup.screenshot_url} alt="chart" style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>{setup.name}</h1>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '500' }}>{setup.pair}</span>
                <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '500', textTransform: 'capitalize' }}>{setup.market_condition}</span>
              </div>
            </div>
            {setup.win_rate && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#22c55e' }}>{setup.win_rate}%</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{setup.total_trades} trades</div>
              </div>
            )}
          </div>

          {setup.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {setup.tags.map((tag: string) => (
                <span key={tag} style={{ background: '#eef2ff', color: '#6366f1', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: '500' }}>{tag}</span>
              ))}
            </div>
          )}

          {setup.entry_rules && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>Entry Rules</h3>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{setup.entry_rules}</p>
            </div>
          )}

          {setup.exit_rules && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>Exit Rules</h3>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{setup.exit_rules}</p>
            </div>
          )}

          {setup.notes && (
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>Notes</h3>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{setup.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}