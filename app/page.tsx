import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', fontFamily: 'var(--font-geist-sans), sans-serif' }}>

      <nav style={{ background: 'white', borderBottom: '1px solid #ebebeb', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>S</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>Setup Vault</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/login" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>Login</Link>
          <Link href="/signup" style={{ background: '#6366f1', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>Sign up free</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#eef2ff', color: '#6366f1', fontSize: '13px', fontWeight: '500', padding: '6px 14px', borderRadius: '20px', marginBottom: '28px' }}>
          Built for serious traders
        </div>
        <h1 style={{ fontSize: '52px', fontWeight: '700', color: '#111', lineHeight: '1.15', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          Your trading setups,<br />finally organized.
        </h1>
        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.7', margin: '0 0 40px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
          Stop losing your best setups in scattered Notion pages and screenshot folders. Setup Vault gives every strategy a proper home.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ background: '#6366f1', color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>
            Sign up free →
          </Link>
          <Link href="/login" style={{ background: 'white', color: '#555', padding: '14px 28px', borderRadius: '10px', fontSize: '16px', fontWeight: '500', textDecoration: 'none', border: '1px solid #e5e5e5' }}>
            Login
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>📋</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Setup Playbook</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Document every setup with entry rules, exit rules, market conditions, and personal notes — all in one place.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>📊</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Track Performance</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Log win rate and total trades per setup. Know exactly which strategies are working and which aren't.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Filter & Search</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Find any setup instantly by name or tag. Filter by scalping, swing, FVG, order block, and more.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>🖼️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Chart Screenshots</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Attach chart screenshots to each setup. Visual reference when you need to recall exactly how a pattern looks.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>🏷️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Smart Tagging</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Tag setups by strategy type, market condition, and pair. Build a library that grows with your trading style.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #ebebeb', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>🔒</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111', margin: '0 0 8px' }}>Private by Default</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>Your setups are yours alone. No public sharing, no social feed. Just your personal trading library.</p>
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid #ebebeb', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>© 2026 Setup Vault. Free during beta.</p>
      </div>

    </div>
  )
}