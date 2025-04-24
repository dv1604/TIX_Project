export type SlotResponse = {
    id : number;
    time: string;
  };
  
  export type ScreenResponse = {
    id : number;
    name: string;
    price: number;
    slots: SlotResponse[];
  };
  
  export type TheatreResponse = {
    id : number;
    name: string;
    location: string;
    chain: string;
    screens: ScreenResponse[];
  };
  
  export type CityResponse = {
    id : number;
    name: string;
    theatres: TheatreResponse[];
  };
  
  export type DayResponse = {
    id : number;
    dayOffset: number;
    cities: CityResponse[];
  };
  
  export type MovieResponse = {
    id : number;
    title: string;
    genre: string;
    duration: string;
    rating: string;
    director: string;
    image: string;
    days: DayResponse[];
  };
  