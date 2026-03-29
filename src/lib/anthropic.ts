import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateSOP(input: string, industry?: string): Promise<string> {
  const systemPrompt = `You are an expert technical writer who creates professional Standard Operating Procedures (SOPs).

Given raw notes, bullet points, or informal descriptions of a process, transform them into a clear, professional SOP document.

Format the SOP with:
- **Title**: Clear, descriptive title
- **Purpose**: Why this procedure exists
- **Scope**: Who this applies to
- **Responsibilities**: Who does what
- **Procedure**: Numbered step-by-step instructions
- **Safety Considerations**: If applicable
- **References**: Related documents or standards

Use clear, direct language. Be specific and actionable. Include safety warnings where relevant.${industry ? ` This SOP is for the ${industry} industry — use appropriate terminology and standards.` : ''}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Convert the following notes into a professional SOP:\n\n${input}`,
      },
    ],
    system: systemPrompt,
  })

  const block = message.content[0]
  if (block.type === 'text') {
    return block.text
  }
  throw new Error('Unexpected response format')
}
