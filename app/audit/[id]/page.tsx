"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuditPage() {

  const params = useParams()

  const [audit, setAudit] = useState<any>(null)

  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {

    const fetchAudit = async () => {

      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", params.id)
        .single()

      if (!error) {
        setAudit(data)
      }
    }

    fetchAudit()

  }, [params])

  const saveLead = async () => {

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          role,
        },
      ])

    if (!error) {
      setSubmitted(true)
    }
  }

  if (!audit) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Loading audit...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl p-8">

        <p className="text-sm uppercase tracking-wide text-gray-400">
          Audit Report
        </p>

        <h1 className="text-4xl font-bold mt-4">
          Potential Savings: ${audit.savings}
        </h1>

        <div className="mt-6 space-y-4">

          <div>
            <p className="text-gray-400">Tool</p>
            <p className="text-xl">{audit.tool}</p>
          </div>

          <div>
            <p className="text-gray-400">Monthly Spend</p>
            <p className="text-xl">${audit.spend}</p>
          </div>

          <div>
            <p className="text-gray-400">Seats</p>
            <p className="text-xl">{audit.seats}</p>
          </div>

          <div>
            <p className="text-gray-400">Recommendation</p>

            <p className="text-lg">
              {audit.recommendation}
            </p>
          </div>

        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied!")
          }}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
        >
          Copy Share Link
        </button>

        <div className="mt-10 border-t border-zinc-700 pt-8">

          <h2 className="text-2xl font-bold">
            Get More AI Savings Tips
          </h2>

          <p className="text-gray-400 mt-2">
            Leave your details and we’ll share more optimization ideas.
          </p>

          {!submitted ? (

            <div className="mt-6 space-y-4">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-black text-white p-4"
              />

              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl bg-black text-white p-4"
              />

              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl bg-black text-white p-4"
              />

              <button
                onClick={saveLead}
                className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
              >
                Submit
              </button>

            </div>

          ) : (

            <p className="mt-6 text-green-500 font-semibold">
              Thanks! Your details have been saved ✓
            </p>

          )}

        </div>

      </div>

    </main>
  )
}