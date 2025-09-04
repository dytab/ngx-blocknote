#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript files in the libs/ngx-blocknote directory
const pattern = 'libs/ngx-blocknote/src/**/*.ts';

function fixNullEditorChecks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Add null check after editor assignment
  const editorAssignmentPattern =
    /(\s+)(const editor = this\.ngxBlockNoteService\.editor\(\);)\n(\s+)((?!if \(!editor\)).)/g;
  const editorAssignmentReplacement =
    '$1$2\n$1if (!editor) {\n$1  return;\n$1}\n$4$5';

  if (editorAssignmentPattern.test(content)) {
    content = content.replace(
      editorAssignmentPattern,
      editorAssignmentReplacement,
    );
    modified = true;
  }

  // Pattern 2: Add null check before direct editor usage
  const directEditorUsagePattern =
    /(this\.ngxBlockNoteService\.editor\(\)\.(?!dictionary\b))/g;

  // Check for lines that use editor directly without null check
  const lines = content.split('\n');
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line uses editor directly
    if (directEditorUsagePattern.test(line)) {
      const indentation = line.match(/^(\s*)/)[1];
      const modifiedLine = line.replace(
        /this\.ngxBlockNoteService\.editor\(\)/g,
        'this.ngxBlockNoteService.editor()!',
      );
      newLines.push(line); // Keep original for now
    } else {
      newLines.push(line);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

// This is a simple approach - let's manually fix the most critical files instead
console.log('Manual approach recommended for TypeScript null safety fixes');
