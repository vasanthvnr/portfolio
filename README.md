# Vasanth S — Portfolio

My Portfolio Direct Access link: https://vasanthvnr.github.io/portfolio/index.html

## What's inside
- `index.html` — main site (Home, About, Experience & Education, Projects, Live GitHub feed, Skills, Contact)
- `style.css` — all styling (dark/light theme system)
- `script.js` — typing effect, theme toggle, live GitHub repo sync, smart chatbot
- `image/` — all project & profile images
- `Vasanth_IT_Resume.pdf` — downloadable resume

## Notes for Vasanth
- The **"Live From GitHub"** section auto-pulls every public repo from
  `https://api.github.com/users/vasanthvnr/repos` — no manual updates needed when you push new repos.
- Two placeholder project links currently point to your GitHub profile home page instead of a specific repo
  (since no public repo URL could be confirmed for them yet):
  - "One Snap Mista" (food/skincare ingredient scanner)
  - "Mechanic Garage Platform"
  - "Spin & Win Wheel"
  Swap the `href` on their **"View on GitHub"** buttons in `index.html` once those repos are public.
- Chatbot answers are driven by a keyword-scoring engine in `script.js` (`INTENTS` array) — add a new
  object there any time you want it to answer a new topic.
