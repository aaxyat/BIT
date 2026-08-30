import fs from 'node:fs';
import path from 'node:path';

/**
 * Slide Overflow & Length Linter
 * Scans generated .astro slide decks to ensure text budgets prevent canvas overflow.
 */

const MAX_WORDS_PER_PARAGRAPH = 90;
const MAX_CODE_LINES = 25;
const MAX_CARD_WORDS = 65;

function scanSlideFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const fileName = path.basename(filePath);

  // Extract Slide sections
  const slideRegex = /<Slide[\s\S]*?<\/Slide>/g;
  const slides = content.match(slideRegex) || [];

  slides.forEach((slideContent, index) => {
    const slideNumber = index + 1;

    // Check code blocks
    const codeMatches = slideContent.match(/code=\{`([\s\S]*?)`\}/g) || [];
    codeMatches.forEach((codeBlock) => {
      const lines = codeBlock.split('\n').length;
      if (lines > MAX_CODE_LINES) {
        issues.push(`Slide ${slideNumber} (${fileName}): Code block has ${lines} lines (max recommended: ${MAX_CODE_LINES}). Split slide or truncate helper functions.`);
      }
    });

    // Check paragraphs
    const pMatches = slideContent.match(/<p[\s\S]*?>([\s\S]*?)<\/p>/g) || [];
    pMatches.forEach((p) => {
      const cleanText = p.replace(/<[^>]+>/g, '').trim();
      const words = cleanText.split(/\s+/).filter(Boolean).length;
      if (words > MAX_WORDS_PER_PARAGRAPH) {
        issues.push(`Slide ${slideNumber} (${fileName}): Paragraph has ${words} words (max recommended: ${MAX_WORDS_PER_PARAGRAPH}). Split across slides or into multi-zone layout.`);
      }
    });
  });

  return issues;
}

function runAudit() {
  const pagesDir = path.resolve('src/pages');
  let totalIssues = 0;

  function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.astro') && fullPath.includes('decks')) {
        const issues = scanSlideFile(fullPath);
        if (issues.length > 0) {
          console.warn(`\n[OVERFLOW WARNINGS in ${path.relative(process.cwd(), fullPath)}]`);
          issues.forEach((iss) => console.warn(`  - ${iss}`));
          totalIssues += issues.length;
        }
      }
    });
  }

  if (fs.existsSync(pagesDir)) {
    walk(pagesDir);
  }

  if (totalIssues === 0) {
    console.log('✓ Slide overflow audit passed: all slides within canvas budgets.');
    process.exit(0);
  } else {
    console.warn(`\nFound ${totalIssues} potential overflow warning(s). Review slide splitting.`);
    process.exit(0); // Warning only, does not fail build
  }
}

runAudit();
