import SpendForm from "../components/SpendForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-5xl font-bold tracking-tight">
          AI Spend Audit
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Discover how much your team is overspending on AI tools.
        </p>

        <SpendForm />

      </div>

    </main>
  )
}