# Open in VS Code and publish on GitHub Pages

## 1. Extract and open
1. Right-click one-more-impression.zip in Windows and choose Extract All.
2. In VS Code choose File > Open Folder and select the extracted folder containing index.html.
3. Edit script.js for messages, style.css for colours and fonts, and index.html for the page shell.
4. Open index.html in your browser for a quick preview. You can also use a local preview extension in VS Code.

No npm install, build command, backend, or ChatGPT account is needed to run these files.

## 2. Create an empty GitHub repository
Create a new repository named one-more-impression on GitHub. For GitHub Free, use a public repository. Leave the options to add a README, .gitignore, and license unchecked: this folder already includes its own files.

## 3. Push from VS Code
Open Terminal > New Terminal in the extracted project folder. Run each line in order, replacing YOUR-USERNAME with your GitHub username:

```powershell
git init
git add .
git commit -m "Add personal website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/one-more-impression.git
git push -u origin main
```

Complete GitHub sign-in if prompted. These commands assume the fresh extracted folder and a new empty repository. Do not run git init inside another existing project.

## 4. Turn on Pages
1. Open the repository on GitHub.
2. Go to Settings > Pages.
3. Set Source to Deploy from a branch.
4. Select main and /(root), then Save.
5. Wait for the deployment to finish; the Pages settings will show the website address.

The expected address is https://YOUR-USERNAME.github.io/one-more-impression/ .
The files must sit at the repository root: index.html, style.css, script.js, and assets/white-ferrari.mp3. Keep the included .nojekyll file so GitHub serves this as a plain static website.

## 5. Publish later edits
After saving your edits and checking them locally:

```powershell
git add .
git commit -m "Update website"
git push
```

GitHub Pages republishes the branch after each push. Check the repository Actions tab if a deployment fails. If the browser shows an older version, refresh with Ctrl+F5.

## Included files
- index.html: page layout and footer.
- style.css: all colours, gradients, mobile layouts, and animations.
- script.js: messages, music controls, navigation, response buttons, and confetti.
- assets/white-ferrari.mp3: your uploaded audio, included in full.
- README.md: customization details and verification notes.
- .nojekyll: GitHub Pages static-file configuration.

The deployed website is publicly accessible. Responses are displayed locally and are not sent to you. Music starts only after a tap on the music button.

Official GitHub instructions:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
