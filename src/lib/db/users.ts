import { supabase } from '../supabase'

// Example type for your user
export type User = {
  id?: number
  name: string
  email: string
  height?: number
  weight?: number
  age?: number
  activity_level?: string
  goal?: string
  protein_goal?: number
  calories_goal?: number
}

// Create a new user
export async function createUser(userData: User) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
  
  if (error) throw error
  return data
}

// Fetch a user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
    
  if (error) throw error
  return data
}

// Update user data
export async function updateUser(userId: number, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    
  if (error) throw error
  return data
} 