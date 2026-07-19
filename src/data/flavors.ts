export type ThemeMode = 'light' | 'dark';

export interface Flavor {
  id: string;
  /** Anzeigename der Sorte */
  name: string;
  /** Editions-/Fantasiename */
  edition: string;
  watermark: string;
  subtitle: string;
  description: string;
  gradient: string;
  theme: ThemeMode;
  /** Akzentfarbe für Buttons, Preise, Partikel */
  accent: string;
  particleColors: string[];
  image: string;
  imageFallback: string;
}

export const CARTRIDGE_PRICE = 4;
export const STARTER_KIT_PRICE = 10;
/** Nachfüllflasche mit Slab-Logo (Preis anpassbar) */
export const BOTTLE_PRICE = 6;

export const flavors: Flavor[] = [
  {
    id: 'kiwi-erdbeere',
    name: 'Kiwi Erdbeere',
    edition: 'Wave Rider',
    watermark: 'KIWI',
    subtitle: 'Frisch. Fruchtig.\nUnaufhaltsam.',
    description:
      'Saftige Erdbeeren treffen auf spritzige Kiwi –\neine Welle aus Frische, die dich mitreißt.\n\nSüß, grün und voller Sommer.',
    gradient: 'radial-gradient(circle at center, #B4E062 0%, #3E8E41 45%, #6E1B2E 100%)',
    theme: 'dark',
    accent: '#B4E062',
    particleColors: ['#B4E062', '#E63950', '#FFD166', '#7ED957'],
    image: '/images/flavors/kiwi-erdbeere.jpg',
    imageFallback: '/images/flavors/kiwi-erdbeere.svg',
  },
  {
    id: 'fata-morgana',
    name: 'Wassermelone Honigmelone',
    edition: 'Fata Morgana',
    watermark: 'FATA',
    subtitle: 'Eine Oase.\nMitten in der Wüste.',
    description:
      'Kühle Wassermelone verschmilzt mit\nsüßer Honigmelone zu einer Illusion aus Frische.\n\nSo gut, dass du sie kaum glauben wirst.',
    gradient: 'radial-gradient(circle at center, #FFF0CE 0%, #E0B36A 45%, #6E4A1C 100%)',
    theme: 'light',
    accent: '#8A5A1E',
    particleColors: ['#FFD98E', '#F2B96B', '#FF6B6B', '#A8D96C'],
    image: '/images/flavors/fata-morgana.jpg',
    imageFallback: '/images/flavors/fata-morgana.svg',
  },
  {
    id: 'black-berry',
    name: 'Johannisbeere',
    edition: 'Black Berry',
    watermark: 'BLACK',
    subtitle: 'Dunkel. Wild.\nIntensiv.',
    description:
      'Schwarze Johannisbeere in ihrer stärksten Form –\nherb, tief und kompromisslos.\n\nEin Geschmack, der seine Spuren hinterlässt.',
    gradient: 'radial-gradient(circle at center, #A45DE0 0%, #45108A 45%, #0C0314 100%)',
    theme: 'dark',
    accent: '#C77DFF',
    particleColors: ['#C77DFF', '#9D4EDD', '#5A189A', '#E0AAFF'],
    image: '/images/flavors/black-berry.jpg',
    imageFallback: '/images/flavors/black-berry.svg',
  },
  {
    id: 'apfel-berry',
    name: 'Apfel Berry',
    edition: 'Steam Press',
    watermark: 'APFEL',
    subtitle: 'Präzision.\nAus dem Labor.',
    description:
      'Knackiger grüner Apfel, gepresst auf\ndunkle Brombeeren und rote Johannisbeeren.\n\nMechanisch perfekt. Geschmacklich explosiv.',
    gradient: 'radial-gradient(circle at center, #CFE372 0%, #6B4E23 45%, #140E05 100%)',
    theme: 'dark',
    accent: '#CFE372',
    particleColors: ['#CFE372', '#D9A441', '#8C2F39', '#F2E8C9'],
    image: '/images/flavors/apfel-berry.jpg',
    imageFallback: '/images/flavors/apfel-berry.svg',
  },
  {
    id: 'doppelbass',
    name: 'Himbeere Blaubeere',
    edition: 'Doppelbass',
    watermark: 'BASS',
    subtitle: 'Zwei Beeren.\nVoller Bass.',
    description:
      'Himbeere und Blaubeere auf zwei Kanälen –\nein Drop aus Süße, der die Membran sprengt.\n\nTurn it up. Feel the flavour.',
    gradient: 'radial-gradient(circle at center, #FF4FA0 0%, #55247A 50%, #06021A 100%)',
    theme: 'dark',
    accent: '#FF4FA0',
    particleColors: ['#FF4FA0', '#4FC3F7', '#E91E8C', '#7986CB'],
    image: '/images/flavors/doppelbass.jpg',
    imageFallback: '/images/flavors/doppelbass.svg',
  },
  {
    id: 'menthol',
    name: 'Menthol',
    edition: 'Frost Aufguss',
    watermark: 'FROST',
    subtitle: 'Eiskalt.\nAufgegossen.',
    description:
      'Klarer Menthol-Frost trifft auf heißen Dampf –\nwie ein Aufguss in der Eissauna.\n\nAtme ein. Frier durch. Genieß es.',
    gradient: 'radial-gradient(circle at center, #EAFBFF 0%, #9FD4E8 45%, #16455A 100%)',
    theme: 'light',
    accent: '#0E6B8C',
    particleColors: ['#FFFFFF', '#B3E5FC', '#81D4FA', '#E1F5FE'],
    image: '/images/flavors/menthol.jpg',
    imageFallback: '/images/flavors/menthol.svg',
  },
];

export const heroGradient =
  'radial-gradient(circle at center, #1E3A5F 0%, #0A1628 55%, #000000 100%)';

export const refillGradient =
  'radial-gradient(circle at center, #3AC6C6 0%, #10505A 50%, #041418 100%)';

export const shopGradient =
  'radial-gradient(circle at center, #24344D 0%, #0C1524 55%, #020409 100%)';
