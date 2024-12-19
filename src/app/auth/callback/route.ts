import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db/users'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (session?.user) {
      try {
        // Check if user exists in our database
        const existingUser = await getUserByEmail(session.user.email!)
        
        if (!existingUser) {
          // Create new user in our database
          await createUser({
            email: session.user.email!,
            name: session.user.user_metadata.full_name || session.user.email!.split('@')[0],
            calories_goal: 2000, // Default values
            protein_goal: 150,
          })
        }
      } catch (error) {
        console.error('Error handling user creation:', error)
      }
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`)
} 