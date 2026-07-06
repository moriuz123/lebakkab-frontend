const fs = require('fs');
const path = require('path');

const vueRegex = /`\/storage\/\$\{([^}]+)\}`/g;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (filePath.endsWith('.vue')) {
    content = content.replace(vueRegex, '$storageUrl($1)');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      processFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'src'));
