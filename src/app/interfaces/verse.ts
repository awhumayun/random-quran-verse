export interface Verse {
    code: number,
    status: string,
    data: {
        number: number
        text: string,
        surah: {
            number: number,
        }
    }
}
