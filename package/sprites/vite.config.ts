import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(), 
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactWebsiteSprites',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      plugins: [preserveDirectives()],
      output: {
        globals: { 
          react: 'React', 
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime' 
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
      },
    },
  },
});
