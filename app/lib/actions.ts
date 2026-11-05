'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';

const skillHeadings = [
  'Languages',
  'Frameworks & Tools',
  'Databases',
  'Backend & APIs',
];

function getTextField(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== 'string') {
    throw new Error(`Missing or invalid form field: ${name}`);
  }

  return value;
}

export async function savePortfolioContent(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('You must be signed in to save portfolio content.');
  }

  const aboutContent = getTextField(formData, 'about');
  const skillContent = skillHeadings.map((heading) => ({
    heading,
    content: getTextField(formData, heading),
  }));

  const { data: skills, error: skillsReadError } = await supabase
    .from('skills')
    .select('id, heading')
    .in('heading', skillHeadings);

  if (skillsReadError) {
    throw new Error(`Failed to load skills for saving: ${skillsReadError.message}`);
  }

  const skillsByHeading = new Map(skills?.map((skill) => [skill.heading, skill]));
  const missingHeadings = skillHeadings.filter((heading) => !skillsByHeading.has(heading));

  if (missingHeadings.length > 0) {
    throw new Error(`Cannot save because these skills rows are missing: ${missingHeadings.join(', ')}`);
  }

  const { data: about, error: aboutReadError } = await supabase
    .from('about')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (aboutReadError) {
    throw new Error(`Failed to load About content for saving: ${aboutReadError.message}`);
  }

  const aboutWrite = about
    ? supabase.from('about').update({ About_content: aboutContent }).eq('id', about.id)
    : supabase.from('about').insert({ About_content: aboutContent });
  const { error: aboutWriteError } = await aboutWrite;

  if (aboutWriteError) {
    throw new Error(`Failed to save About content: ${aboutWriteError.message}`);
  }

  for (const { heading, content } of skillContent) {
    const skill = skillsByHeading.get(heading);

    if (!skill) {
      throw new Error(`Cannot save because the ${heading} skills row is missing.`);
    }

    const { error } = await supabase
      .from('skills')
      .update({ content })
      .eq('id', skill.id);

    if (error) {
      throw new Error(`Failed to save ${heading}: ${error.message}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?saved=1');
}

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

type ContactFormState =
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export async function SubmitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const supabase = await createClient();

  const { error } = await supabase.from('contact_messages').insert({
    first_name: getTextField(formData, 'firstName'),
    last_name: getTextField(formData, 'lastName'),
    email: getTextField(formData, 'email'),
    message: getTextField(formData, 'message'),
  });

  if (error) {
    console.error('Failed to submit contact form:', error);
    return {
      status: 'error',
      message: 'Unable to send your message. Please try again.',
    };
  }

  return { status: 'success', message: 'Your message has been sent.' };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}