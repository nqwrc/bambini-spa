import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Using relative paths for seamless GitHub Pages deployment
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servizi: resolve(__dirname, 'servizi.html'),
        flotta: resolve(__dirname, 'flotta.html'),
        vesselDetail: resolve(__dirname, 'vessel-detail.html'),
        areeIntervento: resolve(__dirname, 'aree-intervento.html'),
        hseq: resolve(__dirname, 'hseq.html'),
        compliance: resolve(__dirname, 'compliance.html'),
        contatti: resolve(__dirname, 'contatti.html'),
        lavoraConNoi: resolve(__dirname, 'lavora-con-noi.html'),
        media: resolve(__dirname, 'media.html'),
      },
    },
  },
});
