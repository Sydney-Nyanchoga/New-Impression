# One more impression
A lightweight, mobile-first personal note in eleven scenes. No backend, build, tracking, or account required.

## Start
Open `index.html` in a browser. For hosting, upload index.html, style.css, script.js and assets together. Do not upload the ZIP as a single web page.

## Personalize
Open `script.js`. The `config` section at the top controls:
Edit the `scenes` array to change other wording. Keep lines short for small screens. Names and configurable messages are inserted as text, not HTML. Scene titles support <br> and <em> markup.

In `style.css`, edit the `:root` colors and `--body-font` / `--display-font`. Replace the Google Fonts import if choosing other fonts. System fallback fonts work offline.

## Interaction
Tap the open story area, or use Space, Enter, or Right Arrow. Use Back or Left Arrow to return, or swipe right to go back and left to continue. The next control waits for a response on choice pages. The first tap during a reveal shows the remaining text; the next advances. Choice screens wait for a button. The top-right circular arrow restarts at any time. Both affirmative buttons share the same ending. No continually dodges and blocks pointer/touch clicks. Keyboard and assistive activation remain available. The affirmative ending stays visible against a bright pastel background with a short confetti shower.


## Deploy
- GitHub Pages: place these files at the root of a repository.
## Verification
JavaScript syntax and automated scene-state checks passed: all scenes, reflection interlude, affirmative/negative outcomes, replay, animation skip, and repeated input while transitioning.
A real browser/device was unavailable in this environment. iOS Safari, Android Chrome, narrow-screen overflow, and rendered typography still need a visual check before sharing. Recommended sizes: 320×568, 390×844, and 430×932. At each size, complete the story, test all three response buttons, and replay. Reduced-motion styles, dynamic viewport height, and safe-area padding are included. Also check the music toggle and the bright confetti ending on your phone.
