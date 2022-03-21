import { Theme } from './symbols';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--mainSpacing': '0.1rem;',
    '--mainTransition': 'all 0.3s linear',
    '--background': '#1F2125',
    '--on-background': '#fff',
    '--primaryColor': 'darkorange',
    '--on-primary': '#fff',
    '--headerBackground': 'rgb(0, 0, 0)',
    '-drawerBackground': 'rgba(103,87,87,.5)'
  }
}