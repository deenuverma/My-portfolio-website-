import JSZip from 'jszip';
import { PortfolioConfig } from '../types';

export async function generatePortfolioZip(config: PortfolioConfig): Promise<Blob> {
  const zip = new JSZip();

  // Fetch base template files from public/template-source
  const filesToFetch = [
    { source: '/template-source/index.html', path: 'index.html' },
    { source: '/template-source/styles.css', path: 'styles.css' },
    { source: '/template-source/app.js', path: 'app.js' },
    { source: '/template-source/LICENSE', path: 'LICENSE' },
    { source: '/template-source/assets/portrait.svg', path: 'assets/portrait.svg' },
    { source: '/template-source/assets/portrait.jpg', path: 'assets/portrait.jpg' },
    { source: '/template-source/assets/music.mp3', path: 'assets/music.mp3' },
    { source: '/template-source/demos/demo.css', path: 'demos/demo.css' },
    { source: '/template-source/demos/flowdesk.html', path: 'demos/flowdesk.html' },
    { source: '/template-source/demos/relayflow.html', path: 'demos/relayflow.html' },
    { source: '/template-source/demos/signalkit.html', path: 'demos/signalkit.html' },
  ];

  for (const item of filesToFetch) {
    try {
      const res = await fetch(item.source);
      if (res.ok) {
        if (item.path.endsWith('.svg') || item.path.endsWith('.png') || item.path.endsWith('.jpg') || item.path.endsWith('.mp3')) {
          const blob = await res.blob();
          zip.file(item.path, blob);
        } else {
          let text = await res.text();
          if (item.path === 'index.html') {
            // Update title to user's name
            text = text.replace(
              /<title>.*?<\/title>/i,
              `<title>${config.name || 'Personal Portfolio'} | The H Portfolio</title>`
            );
          }
          zip.file(item.path, text);
        }
      }
    } catch (e) {
      console.warn(`Could not load ${item.source}`, e);
    }
  }

  // Generate customized portfolio.config.js
  const configJsContent = `/* Customized for ${config.name || 'Your Portfolio'}
 * Built on The H Portfolio Template by Ameer Hamza (MIT Licensed)
 */
window.PORTFOLIO = ${JSON.stringify(config, null, 2)};
`;
  zip.file('portfolio.config.js', configJsContent);

  // Add .nojekyll for GitHub Pages
  zip.file('.nojekyll', '');

  // Add custom README with exact GitHub Pages publishing steps
  const readmeContent = `# ${config.name}'s Cinematic Portfolio

Built with [The H Portfolio Template](https://github.com/Hamza-Muhammadi/The-H-Portfolio-Template) by Ameer Hamza.

## How to Publish to GitHub Pages in 3 Simple Steps

1. **Create a new GitHub repository**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: \`${(config.firstName || 'portfolio').toLowerCase()}-portfolio\` (or \`<your-github-username>.github.io\`)
   - Choose **Public**
   - Do NOT check "Add a README file"
   - Click **Create repository**

2. **Upload these files**
   - In your new repository page, click **uploading an existing file**
   - Drag and drop all the files from this ZIP (index.html, styles.css, app.js, portfolio.config.js, assets/, demos/, etc.)
   - Click **Commit changes**

3. **Turn on GitHub Pages**
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Branch**:
     - Select **main** branch
     - Folder: **/ (root)**
     - Click **Save**
   - Wait 1-2 minutes. Your live link will be: \`https://<your-username>.github.io/${(config.firstName || 'portfolio').toLowerCase()}-portfolio\`!

## Local Preview
Simply double-click \`index.html\` in any web browser to view your portfolio locally without any installation!

## License
MIT License - Based on The H Portfolio Template by Ameer Hamza.
`;
  zip.file('README.md', readmeContent);

  // Generate the binary blob
  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
