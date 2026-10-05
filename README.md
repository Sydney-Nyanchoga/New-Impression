# One more impression
A lightweight, mobile-first personal note in eleven scenes. No backend, build, tracking, or account required.

## Start
Open `index.html` in a browser. For hosting, upload index.html, style.css, script.js and assets together. Do not upload the ZIP as a single web page.

## Personalize
Open `script.js`. The `config` section at the top controls:
- `herName`: her name (empty means “A little note for you”).
- The footer is fixed to “For Munzu ❤️💜”; edit the signature text in index.html and script.js to change it.
- `apology`: three short paragraphs for the apology scene.
- `finalQuestion`: your invitation.
- `yesResponse` / `noResponse`: the ending messages.
- `animationSpeed`: 1 is default, 0.7 is faster, 1.4 is slower.
Edit the `scenes` array to change other wording. Keep lines short for small screens. Names and configurable messages are inserted as text, not HTML. Scene titles support <br> and <em> markup.

In `style.css`, edit the `:root` colors and `--body-font` / `--display-font`. Replace the Google Fonts import if choosing other fonts. System fallback fonts work offline.

## Interaction
Tap the open story area, or use Space, Enter, or Right Arrow. Use Back or Left Arrow to return, or swipe right to go back and left to continue. The next control waits for a response on choice pages. The first tap during a reveal shows the remaining text; the next advances. Choice screens wait for a button. The top-right circular arrow restarts at any time. Both affirmative buttons share the same ending. No continually dodges and blocks pointer/touch clicks. Keyboard and assistive activation remain available. The affirmative ending stays visible against a bright pastel background with a short confetti shower.

Answers are NOT collected, stored, or sent anywhere. The affirmative ending invites her to message you. Tap the Music off/on control to enable or mute the user-provided White Ferrari audio in assets/white-ferrari.mp3. Nothing autoplays. Music pauses when the page is hidden. No external music service is needed. The second screen highlights the music toggle. Replace assets/white-ferrari.mp3 to use your own licensed track.

## Deploy
- GitHub Pages: place these files at the root of a repository. In Settings → Pages, publish the main branch's root folder.
- Netlify: use manual deployment and drag in the extracted project folder.
- Vercel: import the repository as a static/Other project; no build command is required.
- Any static host: serve this folder directly.

The supplied ChatGPT Site is private to its owner. Use your chosen public static hosting service for a link she can open without your account.

## Verification
JavaScript syntax and automated scene-state checks passed: all scenes, reflection interlude, affirmative/negative outcomes, replay, animation skip, and repeated input while transitioning.
A real browser/device was unavailable in this environment. iOS Safari, Android Chrome, narrow-screen overflow, and rendered typography still need a visual check before sharing. Recommended sizes: 320×568, 390×844, and 430×932. At each size, complete the story, test all three response buttons, and replay. Reduced-motion styles, dynamic viewport height, and safe-area padding are included. Also check the music toggle and the bright confetti ending on your phone.
