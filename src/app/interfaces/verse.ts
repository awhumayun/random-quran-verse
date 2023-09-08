export interface Verse {
  code: number;
  status: string;
  data: {
    numberInSurah: number;
    text: string;
    surah: {
      number: number;
    };
  };
}
