export type newsResponse = {
    id : number,
    heading: string,
    description: string,
    image: string,
    category: string,
    releaseDate : string,
    keywords: {id : number , name : string}[],
    videoUrl?: string}