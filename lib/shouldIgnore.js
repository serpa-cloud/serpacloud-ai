function shouldIgnore(filePath, ignoreList) {
  const binaryImageFontLockPatterns = /\.(png|jpg|jpeg|gif|bmp|tiff|ico|webp|svg|mp4|mkv|avi|exe|dll|bin|woff|woff2|ttf|otf|lock)$/i;

  const gitIgnorePatterns = [
    // Logs
    'logs',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',

    // Dependency directories
    'node_modules/',
    'bower_components/',

    // Build directories
    'build/',
    'dist/',
    'out/',
    'release/',

    // Electron
    '.electron/',
    '*.asar',
    '*.bak',

    // Runtime data
    '*.pid',
    '*.seed',
    '*.pid.lock',

    // Coverage
    'coverage/',
    '.nyc_output/',

    // Miscellaneous
    '.env',
    '.DS_Store',
    'Thumbs.db',
    '.vscode/',
    '.idea/',
    'tmp/',
    'temp/',

    // Python
    '__pycache__/',
    '*.py[cod]',
    '*$py.class',
    'venv/',
    'ENV/',
    'env.bak/',
    'env/',
    'instance/',
    '.scrapy',

    // PHP
    'vendor/',
    'composer.lock',
    '.env',
    '.phpunit.result.cache',

    // Go
    '*.exe',
    '*.dll',
    '*.so',
    '*.dylib',
    '*.test',
    '*.out',

    // Rust
    '/target/',
    '**/*.rs.bk',

    // Java
    '*.class',
    '*.jar',
    '*.war',
    '*.ear',
    '*.nar',
    '*.rar',
    '*.har',
    '*.sar',
    '*.jnilib',
    '*.zip',
    'target/',
    'bin/',
    'out/',
    '.mvn/',
    '.gradle/',

    // Java Spring
    '*.log',
    'spring.log',
    'pom.xml.tag',
    'pom.xml.releaseBackup',
    'release.properties',

    // C++
    '*.o',
    '*.obj',
    '*.so',
    '*.dylib',
    '*.dll',
    '*.mod',
    '*.smod',
    '*.lib',
    '*.a',
    '*.exe',
    '*.out',
    '*.app',
    'CMakeFiles/',
    'Makefile',
    '*.vcxproj',
    'ipch/',
    '*.pdb',
    '*.idb',
    '*.ilk',
    '*.tlog',
    'obj/',

    // Lock files
    'package-lock.json',
    'yarn.lock',

    // Framework-specific directories
    '.next/', // Next.js
    '.nuxt/', // Nuxt.js
    '.expo/', // Expo (React Native)
    '.angular/', // Angular CLI
    '.svelte-kit/', // SvelteKit
    '.cache/', // Gatsby and other static site generators
    'tmp/', // Ember.js
    '.meteor/', // Meteor.js
    'out/', // Vercel/Next.js build output
    '.serverless/', // Serverless framework
    '.firebase/', // Firebase build
    '.quasar/', // Quasar (Vue.js framework)
    'build/', // Create React App, and other build folders
  ];

  return (
    ignoreList.some((pattern) => filePath.includes(pattern) || `/${filePath}`.includes(pattern)) ||
    gitIgnorePatterns.some((pattern) => new RegExp(pattern.replace(/\*/g, '.*')).test(filePath)) ||
    filePath.includes('.git') ||
    filePath.includes('serpacloud.json') ||
    filePath.includes('serpacloudManifest.json') ||
    binaryImageFontLockPatterns.test(filePath)
  );
}
