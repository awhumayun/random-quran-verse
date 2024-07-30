import { Translation } from "../interfaces/translation";

export const TRANSLATIONS: Translation[] = [
  {
    id: "en.ahmedali",
    name: "Ahmed Ali",
  },
  {
    id: "en.ahmedraza",
    name: "Ahmed Raza Khan",
  },
  {
    id: "en.arberry",
    name: "Arberry",
  },
  {
    id: "en.asad",
    name: "Asad",
  },
  {
    id: "en.daryabadi",
    name: "Daryabadi",
  },
  {
    id: "en.hilali",
    name: "Hilali & Khan",
    number: 203,
  },
  {
    id: "en.pickthall",
    name: "Pickthall",
    number: 19,
  },
  {
    id: "en.qaribullah",
    name: "Qaribullah & Darwish",
  },
  {
    id: "en.sahih",
    name: "Saheeh International",
    number: 20,
  },
  {
    id: "en.sarwar",
    name: "Sarwar",
  },
  {
    id: "en.yusufali",
    name: "Yusuf Ali",
    number: 22,
  },
];

export const DEFAULT_TRANSLATION = TRANSLATIONS[8];

export const TOTAL_VERSES: number = 6236;

export const BASE_QURAN_URL: string = "https://quran.com";
