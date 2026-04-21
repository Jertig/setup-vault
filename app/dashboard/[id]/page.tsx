import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export default async function SetupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: setup } = await supabase
    .from('setups')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!setup) notFound()

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-bold">{setup.name}</h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 flex flex-col gap-5">
          <div className="flex gap-3">
            <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full">{setup.pair}</span>
            <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full">{setup.market_condition}</span>
          </div>

          {setup.win_rate && (
            <p className="text-green-400 font-medium">{setup.win_rate}% WR · {setup.total_trades} trades</p>
          )}
          
          {setup.screenshot_url && (
  <img src={setup.screenshot_url} alt="chart screenshot" className="rounded-lg w-full object-cover" />
)}

          {setup.entry_rules && (
            <div>
              <h3 className="text-sm text-zinc-400 mb-2">Entry Rules</h3>
              <p className="text-sm whitespace-pre-wrap">{setup.entry_rules}</p>
            </div>
          )}

          {setup.exit_rules && (
            <div>
              <h3 className="text-sm text-zinc-400 mb-2">Exit Rules</h3>
              <p className="text-sm whitespace-pre-wrap">{setup.exit_rules}</p>
            </div>
          )}

          {setup.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {setup.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {setup.notes && (
            <div>
              <h3 className="text-sm text-zinc-400 mb-2">Notes</h3>
              <p className="text-sm whitespace-pre-wrap">{setup.notes}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link href={`/dashboard/${setup.id}/edit`}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition-colors">
              Edit
            </Link>
            <DeleteButton id={setup.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={async () => {
      'use server'
      const { createClient } = await import('@/lib/supabase/server')
      const { redirect } = await import('next/navigation')
      const supabase = await createClient()
      await supabase.from('setups').delete().eq('id', id)
      redirect('/dashboard')
    }}>
      <button type="submit" className="bg-red-900/50 hover:bg-red-900 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors">
        Delete
      </button>
    </form>
  )
}