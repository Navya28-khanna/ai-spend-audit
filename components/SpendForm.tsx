"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { runAudit } from "../lib/audit-engine"
import { supabase } from "../lib/supabase"

export default function SpendForm() {

  const { register, handleSubmit } = useForm()

  const [result, setResult] = useState<any>(null)
  const [saved, setSaved] = useState(false)

  const onSubmit = async (data: any) => {

    const auditResult = runAudit(
      data.tool,
      Number(data.spend),
      Number(data.seats)
    )

    setResult(auditResult)

    const { data: insertedAudit, error } = await supabase
      .from("audits")
      .insert([
        {
          tool: data.tool,
          spend: Number(data.spend),
          seats: Number(data.seats),
          savings: auditResult.savings,
          recommendation: auditResult.recommendation,
        },
      ])
      .select()

    if (error) {
      console.log(error)
    } else {
      setSaved(true)

      window.location.href = `/audit/${insertedAudit?.[0]?.id}`
    }
  }

  return (
    <div className="mt-8">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <input
          {...register("tool")}
          placeholder="Tool name (e.g. ChatGPT, Claude)"
          className="w-full rounded-xl bg-white text-black p-4 outline-none"
        />

        <input
          {...register("spend")}
          type="number"
          placeholder="Monthly spend ($)"
          className="w-full rounded-xl bg-white text-black p-4 outline-none"
        />

        <input
          {...register("seats")}
          type="number"
          placeholder="Number of users"
          className="w-full rounded-xl bg-white text-black p-4 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 font-semibold text-lg"
        >
          Run AI Audit
        </button>

      </form>

      {result && (
        <div className="mt-8 rounded-2xl bg-white text-black p-6 shadow-xl">

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Audit Report
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Potential Savings: ${result.savings}
          </h2>

          <p className="mt-3 text-lg text-gray-700">
            {result.recommendation}
          </p>

          {saved && (
            <p className="mt-4 text-green-600 font-semibold">
              Audit saved successfully ✓
            </p>
          )}

        </div>
      )}

    </div>
  )
}