'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return error.message;

  redirect('/admin');
}