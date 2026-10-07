import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      cssFileName: 'claudesprites',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      // Keep one file per module so bundlers can tree-shake unused mascots
      // and "use client" stays on each component file.
      output: (['es', 'cjs'] as const).map((format) => ({
        format,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`,
        exports: 'named' as const,
      })),
    },
  },
});
