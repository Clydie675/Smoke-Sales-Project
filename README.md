# Cigarette Credit Recorder

A modern, simple website for recording customers who purchase cigarettes on credit from any device using Supabase.

## Features

- Handles cigarette sales only
- Captures customer name and quantity
- Auto-calculates total using fixed price `K1.50` per cigarette
- Requires approval password `FFMR5` before saving any record
- Stores records in Supabase cloud database
- Uses a separate owner page to mark records as paid or not paid
- Lists all records with customer name, quantity, total, and payment status

## Project Structure

- `index.html`
- `owner.html`
- `css/style.css`
- `js/script.js`
- `assets/`
- `supabase-schema.sql`

## Supabase Setup (Required for Multi-Device Access)

1. Create a free Supabase project at [supabase.com](https://supabase.com).
2. In Supabase, open SQL Editor and run `supabase-schema.sql`.
3. In Supabase Project Settings > API, copy:
   - Project URL
   - Anon public key
4. Open `index.html` and `owner.html` and replace:
   - `YOUR_SUPABASE_URL`
   - `YOUR_SUPABASE_ANON_KEY`
5. Save and reload the website.

## Owner Authentication Setup (Required for Payment Updates)

1. In Supabase Dashboard > Authentication > Providers, keep Email provider enabled.
2. Go to Authentication > Users and create these owner users:
   - `kila@owners.local` / password `FFMR5`
   - `clyde@owners.local` / password `FFMR5`
   - `francis@owners.local` / password `FFMR5`
3. Open `owner.html` and sign in using:
   - Username: `kila`, `clyde`, or `francis`
   - Password: `FFMR5`
4. In owner page, mark each sale as `PAID` or `NOT PAID`.
5. Main `index.html` page shows payment status to everyone.

## Run Locally

1. Complete the Supabase setup steps above.
2. Open `index.html` in your browser.

## Host on GitHub (First Project)

1. Create a new repository on GitHub.
2. In your project folder, run:
   - `git init`
   - `git add .`
   - `git commit --trailer "Made-with: Cursor" -m "Initial cigarette credit recorder website"`
   - `git branch -M main`
   - `git remote add origin <your-repo-url>`
   - `git push -u origin main`
3. (Optional) Enable GitHub Pages:
   - Repository Settings > Pages
   - Source: Deploy from branch
   - Branch: `main` / root

Then your website will be live on a GitHub Pages URL and all devices will share the same records.
