'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const handleGoogleSignup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`
      }
    })
    
    if (error) console.log('Error:', error.message)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Join NooshTrition to start your health journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <FaGoogle className="w-4 h-4" />
            Sign up with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary underline underline-offset-4">
              Log in
            </Link>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            By signing up, you agree to our{' '}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}