# React Code Standards

## Import Ordering

Imports should be in the following order to maintain consistency

1. React import
2. Library imports (Alphabetical order)
3. Absolute imports from the project (Alphabetical order)
4. Relative imports (Alphabetical order)
5. Import * as
6. Import ‘./<some file>.<some extension>

And each type of import should be separated by an empty line

## CSS

1. Create a CSS class when there are more than two attributes
2. Place all CSS files into common folders

## Naming

1. Files should have names that are logically related to function.
2. Folder names should be in camelCase
3. Component names should be in PascalCase
4. Helper files should be in camelCase
5. Test files should have the same name as the file it is testing (e.g. `Component.js` has the test `Component.test.js`)