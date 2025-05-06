import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        Roboto: 'Roboto:300,500,600,800',
      },
    }),
  ],
});
