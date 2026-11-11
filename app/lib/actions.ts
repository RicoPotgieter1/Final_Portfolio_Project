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

export async function saveProjectScreenshots(
  projectId: string,
  uploadedPaths: string[],
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'You must be signed in to upload project screenshots.' };
  }

  if (
    typeof projectId !== 'string' ||
    !/^\d+$/.test(projectId) ||
    !Array.isArray(uploadedPaths) ||
    uploadedPaths.length === 0 ||
    uploadedPaths.length > 10 ||
    uploadedPaths.some((path) => typeof path !== 'string')
  ) {
    return { error: 'The project or screenshot list is invalid.' };
  }

  const screenshotPathPattern = new RegExp(
    `^project-${projectId}/[0-9a-f-]{36}(?:-[a-zA-Z0-9_-]+)?\\.(jpg|png|webp)$`,
    'i',
  );
  if (uploadedPaths.some((path) => !screenshotPathPattern.test(path))) {
    return { error: 'One or more screenshot paths are invalid.' };
  }

  const { data: project, error: projectReadError } = await supabase
    .from('projects')
    .select('file_path')
    .eq('id', projectId)
    .maybeSingle();

  if (projectReadError) {
    return { error: `Failed to load the project screenshots: ${projectReadError.message}` };
  }

  if (!project) {
    return { error: 'The selected project could not be found.' };
  }

  const filePaths = [...new Set([...(project.file_path ?? []), ...uploadedPaths])];
  const { data: updatedProject, error: updateError } = await supabase
    .from('projects')
    .update({ file_path: filePaths })
    .eq('id', projectId)
    .select('id')
    .maybeSingle();

  if (updateError) {
    return { error: `Failed to save screenshot paths: ${updateError.message}` };
  }

  if (!updatedProject) {
    return { error: 'The selected project could not be updated.' };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { error: null };
}

export async function removeProjectScreenshot(
  projectId: string,
  screenshotPath: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'You must be signed in to remove project screenshots.' };
  }

  if (typeof projectId !== 'string' || !/^\d+$/.test(projectId)) {
    return { error: 'The project is invalid.' };
  }

  const screenshotPathPattern = new RegExp(
    `^project-${projectId}/[0-9a-f-]{36}(?:-[a-zA-Z0-9_-]+)?\\.(jpg|png|webp)$`,
    'i',
  );
  if (typeof screenshotPath !== 'string' || !screenshotPathPattern.test(screenshotPath)) {
    return { error: 'The screenshot path is invalid.' };
  }

  const { data: project, error: projectReadError } = await supabase
    .from('projects')
    .select('file_path')
    .eq('id', projectId)
    .maybeSingle();

  if (projectReadError) {
    return { error: `Failed to load the project screenshots: ${projectReadError.message}` };
  }

  if (!project?.file_path?.includes(screenshotPath)) {
    return { error: 'That screenshot is not attached to this project.' };
  }

  const { error: storageError } = await supabase.storage
    .from('screenshots')
    .remove([screenshotPath]);

  if (storageError) {
    return {
      error: `Failed to delete the screenshot from storage: ${storageError.message}`,
    };
  }

  const remainingPaths = project.file_path.filter((path: string) => path !== screenshotPath);
  const { data: updatedProject, error: updateError } = await supabase
    .from('projects')
    .update({ file_path: remainingPaths })
    .eq('id', projectId)
    .contains('file_path', [screenshotPath])
    .select('id')
    .maybeSingle();

  revalidatePath('/');
  revalidatePath('/admin');

  if (updateError) {
    return {
      error: `The screenshot was deleted from storage, but its project reference could not be removed: ${updateError.message}`,
    };
  }

  if (!updatedProject) {
    return {
      error: 'The screenshot was deleted from storage, but the project list changed. Refresh the page.',
    };
  }

  return { error: null };
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