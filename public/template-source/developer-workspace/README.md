# Developer Workspace | The H Series, Day 04

A browser-local project board, snippet library and project link manager by Ameer Hamza.

## Make it yours

1. Download the repository ZIP and extract it.
2. Keep the `developer-workspace` folder. It is a separate app from the portfolio.
3. Change your name, subtitle, portrait path and accent colour in `config.js`.
4. Replace `assets/portrait.jpg` with your own picture. The included portrait belongs to Ameer Hamza and is for this branded demo, not a generic stock image.
5. Open this folder through a local HTTP server (for example VS Code Live Server). ES modules need HTTP, so do not double-click index.html.
6. Add your own projects in the app. The starter project/task records are sample data, not live project results.

## Publish your copy

Upload the contents of this folder to a repository you own. In GitHub Pages choose the branch and root folder containing index.html. No API key, build command or paid service is needed by this app. Hosting availability and limits depend on the provider. Keep the files together and retain the repository license.

## What works

- Project CRUD and project-scoped tasks, snippets and links.
- Three task stages: Up next, In progress and Shipped.
- Desktop drag/drop and an accessible status selector on every task.
- Checklists with live progress bars; snippet pinning and copy.
- Search, language filter, local persistence and JSON backup export/import.
- Responsive mobile layout with status tabs and bottom navigation.
- Change branding in one config file.

## Data and limits

There is no backend, account system, payment system, AI service or cloud sync. Data stays in the browser on the current origin. Another visitor has their own separate workspace. Clearing browser data can remove it. Export before switching devices or hosting URLs. The original DevDesk v1 backup format and storage key are retained for compatibility.

Backup import validates format/version, record references, limits, IDs and safe HTTP(S) URLs, then asks before replacement. Snippets are text and never executed. Do not store API keys, passwords or sensitive customer records.

## AI customization prompt

Read all files in this developer-workspace folder. Help me customize this existing app. Ask my name, preferred colours, portrait and project categories in 3 short questions. Preserve the glass design and functioning project/task/snippet/link/backup flows. Keep data browser-local unless we explicitly agree a backend. Do not add imaginary integrations or results. Replace Ameer Hamza's photo and personal branding with mine, preserve the license, test mobile without horizontal overflow, show a working preview, and guide me through publishing to my own GitHub Pages repository. Never request my GitHub password. Clearly tell me what you tested and what still needs setup.
