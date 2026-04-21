import { NextRequest, NextResponse } from 'next/server'
import { getUserApiKey } from '@/lib/api-keys/user-keys'

type Provider = 'openai' | 'gemini' | 'cursor' | 'morpheus'

// Map agents to their required providers
const AGENT_PROVIDER_MAP: Record<string, Provider | null> = {
  claude: 'morpheus', // Claude uses Morpheus Inference API
  codex: 'morpheus', // Codex uses Morpheus Inference API
  copilot: null, // Copilot uses user's GitHub token from their account
  cursor: 'cursor',
  gemini: 'gemini',
  opencode: 'morpheus', // OpenCode uses Morpheus Inference API
}

// Check if a model is a Gemini model
function isGeminiModel(model: string): boolean {
  const geminiPatterns = ['gemini']
  const lowerModel = model.toLowerCase()
  return geminiPatterns.some((pattern) => lowerModel.includes(pattern))
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const agent = searchParams.get('agent')
    const model = searchParams.get('model')

    if (!agent) {
      return NextResponse.json({ error: 'Agent parameter is required' }, { status: 400 })
    }

    let provider = AGENT_PROVIDER_MAP[agent]
    if (provider === undefined) {
      return NextResponse.json({ error: 'Invalid agent' }, { status: 400 })
    }

    // Special handling for Copilot - check if user has GitHub token
    if (agent === 'copilot') {
      const { getUserGitHubToken } = await import('@/lib/github/user-token')
      const githubToken = await getUserGitHubToken()
      const hasKey = !!githubToken

      return NextResponse.json({
        success: true,
        hasKey,
        provider: 'github',
        agentName: 'Copilot',
      })
    }

    // Override provider based on model for cursor (only agent with multiple providers)
    if (model && agent === 'cursor') {
      if (isGeminiModel(model)) {
        provider = 'gemini'
      }
      // For cursor with other models, keep the default 'cursor' provider
    }

    // Check if API key is available (either user's or system)
    const apiKey = await getUserApiKey(provider!)
    const hasKey = !!apiKey

    return NextResponse.json({
      success: true,
      hasKey,
      provider,
      agentName: agent.charAt(0).toUpperCase() + agent.slice(1),
    })
  } catch (error) {
    console.error('Error checking API key:', error)
    return NextResponse.json({ error: 'Failed to check API key' }, { status: 500 })
  }
}
