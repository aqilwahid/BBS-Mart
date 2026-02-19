
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content
                .replace(/bg-indigo-600/g, 'bg-primary')
                .replace(/text-indigo-600/g, 'text-primary')
                .replace(/border-indigo-600/g, 'border-primary')

                // Lighter shades
                .replace(/bg-indigo-50/g, 'bg-primary-light/10')
                .replace(/text-indigo-900/g, 'text-primary-dark')
                .replace(/text-indigo-700/g, 'text-primary')
                .replace(/border-indigo-100/g, 'border-primary-light/20')
                .replace(/bg-indigo-100/g, 'bg-primary-light/20')
                .replace(/text-indigo-400/g, 'text-primary-light')
                .replace(/shadow-indigo-200/g, 'shadow-primary/20')

                // Darker/other
                .replace(/ring-indigo-200/g, 'ring-primary/20')
                .replace(/border-indigo-50/g, 'border-primary/10')
                .replace(/from-indigo-600/g, 'from-primary')
                .replace(/bg-indigo-900/g, 'bg-primary-dark')
                .replace(/text-indigo-200/g, 'text-green-100') // Specific fix for footer text
                .replace(/shadow-indigo/g, 'shadow-primary')
                .replace(/text-indigo-500/g, 'text-primary')
                .replace(/bg-indigo-500/g, 'bg-primary')
                .replace(/border-indigo-500/g, 'border-primary');

            if (content !== updated) {
                fs.writeFileSync(fullPath, updated);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverse(srcDir);
