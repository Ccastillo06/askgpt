import esbuild from 'rollup-plugin-esbuild'

export default [
  {
    input: `telegram-bot/index.ts`,
    plugins: [esbuild()],
    output: [
      {
        file: `tgbot-dist/index.js`,
        format: 'es'
      }
    ]
  }
]
