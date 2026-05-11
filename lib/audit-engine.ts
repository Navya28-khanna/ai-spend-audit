export function runAudit(
  tool: string,
  spend: number,
  seats: number
) {

  let savings = 0
  let recommendation = "Your setup looks optimized."

  const toolName = tool.toLowerCase()

  if (toolName.includes("chatgpt") && spend > 20) {
    savings = 10
    recommendation =
      "Consider reducing ChatGPT seats or switching plans."
  }

  else if (toolName.includes("claude") && seats >= 5) {
    savings = 50
    recommendation =
      "Switch from Claude Team to Claude Pro to reduce costs."
  }

  else if (toolName.includes("cursor") && seats >= 10) {
    savings = 80
    recommendation =
      "GitHub Copilot Business may be cheaper for larger teams."
  }

  else if (toolName.includes("gemini") && spend > 30) {
    savings = 15
    recommendation =
      "Gemini Advanced may offer similar capabilities at lower cost."
  }

  else if (toolName.includes("copilot") && seats > 20) {
    savings = 100
    recommendation =
      "Enterprise negotiation or annual billing could reduce Copilot costs."
  }

  return {
    savings,
    recommendation,
  }
}