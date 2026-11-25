-- Run after applying the Supabase migrations.

BEGIN;

INSERT INTO public.about ("About_content")
SELECT
  'I''m Rico Potgieter, a developer who enjoys building practical, user-friendly web applications. This portfolio showcases my work, the technologies I use, and what I''m learning as I grow as a developer.'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.about
);

INSERT INTO public.skills (heading, content)
SELECT seed.heading, seed.content
FROM (
  VALUES
    ('Languages', 'TypeScript, JavaScript, HTML, CSS'),
    ('Frameworks & Tools', 'Next.js, React, Tailwind CSS'),
    ('Databases', 'Supabase, PostgreSQL'),
    ('Backend & APIs', 'Supabase, REST APIs')
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
  'Add more project case studies and screenshots as they become available.',
  'https://github.com/RicoPotgieter1/Final_Portfolio_Project',
  'https://final-portfolio-project-eosin.vercel.app/',
  '{}'::text[]
WHERE NOT EXISTS (
  SELECT 1
  FROM public.projects
);

COMMIT;
