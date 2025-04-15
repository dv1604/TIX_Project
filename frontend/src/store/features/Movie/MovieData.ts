import ASSESTS from "../../../assests";

export interface Movies {
    id: number;
    name: string;
    image: string;
    city: City[];
}

export interface City {
    name: string;
    theatres: Theatre[];
}

interface Theatre {
    name: string;
    chain: string;
    location: string;
    screens: Screens[];
}

interface Screens {
    type: string;
    price: number;
    slots: string[];
}

// Common cities but with different theatres or screens in some movies
export const movies: Movies[] = [
    {
        id: 1,
        name: "SPIDERMAN: NO WAY HOME",
        image: ASSESTS.images.spiderman,
        city: [
            {
                name: "Surat",
                theatres: [
                    {
                        name: "Ranjhans Cinema",
                        chain: "CGV",
                        location: "Adajan",
                        screens: [
                            { type: "Regular 2D", price: 150, slots: ["08:00", "09:30", "12:30", "15:45", "21:00"] },
                            { type: "Gold Class 2D", price: 250, slots: ["08:00", "13:00", "16:00", "19:30"] },
                        ],
                    },
                    {
                        name: "INOX VR Mall",
                        chain: "INOX",
                        location: "Dumas Road",
                        screens: [
                            { type: "IMAX 3D", price: 400, slots: ["10:30", "14:30", "18:30", "22:45"] },
                            { type: "Regular 2D", price: 180, slots: ["09:30", "13:00", "16:30", "20:00"] },
                        ],
                    },
                ],
            },
            {
                name: "Ahmedabad",
                theatres: [
                    {
                        name: "PVR Acropolis",
                        chain: "PVR",
                        location: "Thaltej",
                        screens: [
                            { type: "IMAX 3D", price: 500, slots: ["12:00", "15:00", "18:30", "22:00"] },
                            { type: "Regular 2D", price: 200, slots: ["11:00", "14:30", "18:00", "21:30"] },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "YOWIS BEN FINALE",
        image: ASSESTS.images.yowis,
        city: [
            {
                name: "Surat",
                theatres: [
                    {
                        name: "INOX VR Mall",
                        chain: "INOX",
                        location: "Dumas Road",
                        screens: [
                            { type: "Regular 2D", price: 180, slots: ["09:00", "12:30", "15:45", "19:00"] },
                            { type: "VIP Recliner", price: 400, slots: ["10:30", "14:00", "17:30", "21:15"] },
                        ],
                    },
                ],
            },
            {
                name: "Ahmedabad",
                theatres: [
                    {
                        name: "PVR Acropolis",
                        chain: "PVR",
                        location: "Thaltej",
                        screens: [
                            { type: "4DX 3D", price: 600, slots: ["10:00", "14:00", "18:00", "22:00"] },
                            { type: "Regular 2D", price: 220, slots: ["11:30", "15:30", "19:30", "23:00"] },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: "GHOSTBUSTERS: AFTERLIFE",
        image: ASSESTS.images.ghostbusters,
        city: [
            {
                name: "Surat",
                theatres: [
                    {
                        name: "PVR Rahul Raj",
                        chain: "PVR",
                        location: "Dumas Road",
                        screens: [
                            { type: "Regular 2D", price: 200, slots: ["08:30", "12:00", "16:00", "20:30"] },
                            { type: "Gold Class 2D", price: 300, slots: ["09:45", "14:30", "18:45", "22:15"] },
                        ],
                    },
                ],
            },
            {
                name: "Ahmedabad",
                theatres: [
                    {
                        name: "Cinepolis CG Road",
                        chain: "Cinepolis",
                        location: "CG Road",
                        screens: [
                            { type: "IMAX 2D", price: 550, slots: ["10:00", "13:30", "17:00", "21:30"] },
                            { type: "Dolby Atmos 2D", price: 350, slots: ["09:00", "12:30", "16:30", "20:00"] },
                        ],
                    },
                    {
                        name: "PVR Acropolis",
                        chain: "PVR",
                        location: "Thaltej",
                        screens: [
                            { type: "VIP Recliner", price: 500, slots: ["10:30", "14:30", "18:30", "22:45"] },
                            { type: "Regular 2D", price: 200, slots: ["09:30", "13:00", "17:00", "21:00"] },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        name: "HOUSE OF GUCCI",
        image: ASSESTS.images.gucci,
        city: [
            {
                name: "Surat",
                theatres: [
                    {
                        name: "Cinepolis VR Mall",
                        chain: "Cinepolis",
                        location: "Dumas Road",
                        screens: [
                            { type: "Regular 2D", price: 200, slots: ["10:00", "14:30", "18:30", "22:00"] },
                            { type: "Dolby Cinema", price: 450, slots: ["11:00", "15:00", "19:00", "23:30"] },
                        ],
                    },
                ],
            },
            {
                name: "Ahmedabad",
                theatres: [
                    {
                        name: "INOX Rajpath Club",
                        chain: "INOX",
                        location: "SG Highway",
                        screens: [
                            { type: "Gold Class 2D", price: 480, slots: ["10:30", "14:30", "18:30", "22:45"] },
                            { type: "VIP Recliner", price: 550, slots: ["11:00", "15:30", "19:30", "23:00"] },
                        ],
                    },
                ],
            },
        ],
    },
];
