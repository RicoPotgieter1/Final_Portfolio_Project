-- Run after applying the Supabase migrations.

BEGIN;

INSERT INTO public.about ("About_content")
SELECT
  'I''m Rico, a junior full-stack developer looking for a junior developer role where I can build with React, Next.js and Supabase. I like to build full stack apps but I prefer doing back-end coding. I studied at Unicollege because I wanted to learn how to program and grow my knowledge through building projects.'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.about
);

INSERT INTO public.skills (heading, content)
SELECT seed.heading, seed.content
FROM (
  VALUES
    ('Languages', 'JavaScript, HTML, CSS, Python'),
    ('Frameworks & Tools', 'Git, Tailwind CSS'),
    ('Databases', 'Supabase, PostgreSQL'),
    ('Backend & APIs', 'Next.js, Flask')
) AS seed(heading, content)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.skills
  WHERE public.skills.heading = seed.heading
);

INSERT INTO public.projects (
  title,
  description,
  problem,
  role,
  stack,
  next_steps,
  github,
  live_link,
  file_path
)
SELECT
  'Portfolio Website',
  'A responsive personal portfolio built with Next.js, React, and Tailwind CSS. Portfolio content is stored in Supabase and can be updated through a protected editor.',
  'I needed a central place to present my background, skills, and project work, with content that I could update without changing the site code.',
  'Designed and built the portfolio, its Supabase-backed content, and the admin editor.',
  'Next.js, React, TypeScript, Tailwind CSS, Supabase',
  'I would add a mailing system for better communication between the clinic and the patient and a system admin page for easier access to the user accounts.',
  'https://github.com/RicoPotgieter1/Final_Portfolio_Project',
  'https://nextjs-dashboard-gamma-lemon-kyjcybo0s5.vercel.app/,
  '{}'::text[]
WHERE NOT EXISTS (
  SELECT 1
  FROM public.projects
);

COMMIT;
