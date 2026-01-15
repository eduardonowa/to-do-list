import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0524dd',
        'primary-light': '#314ffc',
        'primary-dark': '#09155d',
        border: '#bdbdbd',
        'bg-default': '#fff',
        'bg-dark': '#343644',
        'bg-light': '#efefef',
        'bg-light2': '#fff',
        'bg-popup': '#fff',
        'bg-dark2': '#000211',
        'text-primary': '#3c3f50',
        'text-secondary': '#a3a3a3',
        'text-light': '#fff',
        'white-transparency': '#ffffffd8',
        'warren-terracota': '#c7452d',
        'warren-gold': '#c7935a',
        'warren-dark-charcoal': '#313131',
        'warren-mortar': '#525252',
        'warren-storm-gray': '#757680',
        'warren-grey': '#807c7b',
        'warren-gainsboro': '#dbdbdb',
        'warren-metropole': '#ebe7e6',
        'warren-solitude': '#e5e7eb',
        'warren-hint-of-red': '#faf8f7',
        'warren-whisper': '#f7f3f2',
      },
    },
  },
};

export default config;
