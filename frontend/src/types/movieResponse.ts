export type SlotResponse = {
    id : number;
    time: string;
  };
  
  export type ScreenResponse = {
    name: string;
    price: number;
    slots: SlotResponse[];
  };
  
  export type TheatreResponse = {
    name: string;
    location: string;
    chain: string;
    screens: ScreenResponse[];
  };
  
  export type CityResponse = {
    name: string;
    theatres: TheatreResponse[];
  };
  
  export type DayResponse = {
    dayOffset: number;
    cities: CityResponse[];
  };
  
  export type MovieResponse = {
    title: string;
    genre: string;
    duration: string;
    rating: string;
    director: string;
    image: string;
    days: DayResponse[];
  };
  