import { Movies } from "../entities/Movies";
import { Days } from "../entities/Days";
import { Cities } from "../entities/Cities";
import { Theatre } from "../entities/Theatre";
import { Screens } from "../entities/Screens";
import { Slot } from "../entities/Slot";

export type SlotResponse = Pick<Slot,"id"| "time">;

export type ScreenResponse = Pick<Screens, "id"|"name" | "price"> & {
  slots: SlotResponse[];
};

export type TheatreResponse = Pick<Theatre, "id"|"name" | "location" | "chain"> & {
  screens: ScreenResponse[];
};

export type CityResponse = Pick<Cities, "id"|"name"> & {
  theatres: TheatreResponse[];
};

export type DayResponse = Pick<Days, "id"|"dayOffset"> & {
  cities: CityResponse[];
};

export type MovieResponse = Pick<Movies, "id"| "title" | "genre" | "duration" | "rating" | "director" | "image"> & {
  days: DayResponse[];
};
