import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    external: Object.keys(pkg.peerDependencies),
    input: `src/index.ts`,
    plugins: [esbuild()],
    output: [
      {
        file: `dist/index.js`,
        format: 'es',
        sourcemap: true
      }
    ]
  }
]
