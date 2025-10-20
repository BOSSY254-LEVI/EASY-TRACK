import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET() {
  try {
    const zai = await ZAI.create()

    // Generate AI insights for the dashboard
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant for a field data management system called Easy Track. Generate realistic insights about water quality, health surveys, and climate data in African regions.'
        },
        {
          role: 'user',
          content: 'Generate 3 brief, actionable insights for a field operations dashboard. Include warnings about water quality, success stories about vaccination campaigns, and information about climate data patterns. Make them specific and realistic.'
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const insights = completion.choices[0]?.message?.content || 'No insights available at this time.'

    return NextResponse.json({ 
      success: true, 
      insights,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('AI Insights generation failed:', error.message)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate insights',
        message: error.message 
      },
      { status: 500 }
    )
  }
}