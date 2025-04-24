import {faker} from '@faker-js/faker';
import { NewsCategory } from '../../entities/News';

const generateLongDescription = () => {
    return Array.from({ length: 3 })
      .map(() => faker.lorem.sentences(10))
      .join("\n\n");
  };

export const newsData = [
    // Spotlight
    {
      heading: "Spider-Man: No Way Home Releases Latest Trailer",
      description: generateLongDescription(),
      image: "https://ik.imagekit.io/dimple123/spiderNews.png?updatedAt=1745265482901",
      category: NewsCategory.Spotlight,
      releaseDate : "17 Apr 2025",
      keywords: ["Spider-Man", "Peter Parker", "Marvel"],
    },
    {
      heading: "Facts About the Movie Yowis Ben Finale You Need to Know!",
      description: generateLongDescription(),
      image: "https://ik.imagekit.io/dimple123/yowisNews.png?updatedAt=1745265604748",
      category: NewsCategory.Spotlight,
      releaseDate : "19 Apr 2025",
      keywords: ["Yowis Ben", "Indonesian Film"],
    },
  
    //News
    {
      heading: "Ghostbusters: Afterlife Introduces New Ghosts",
      description: generateLongDescription(),
      image: "https://ik.imagekit.io/dimple123/ghostbustersNews.png?updatedAt=1745265604780",
      category: NewsCategory.News,
      releaseDate : "16 Mar 2025",
      keywords: ["Ghostbusters", "Paranormal"],
    },
    {
      heading: "House of Gucci: The Story of Maurizio Gucci",
      description: generateLongDescription(),
      image: "https://ik.imagekit.io/dimple123/gucciNews.png?updatedAt=1745265604797",
      category: NewsCategory.News,
      releaseDate : "7 Februray 2025",
      keywords: ["House of Gucci", "Lady Gaga", "Drama"],
    },
  
    //Video
    {
      heading: "Watch the Official Trailer of Avengers: Endgame",
      description: "Get ready for the most epic showdown in the Marvel Universe!",
      image: "https://ik.imagekit.io/dimple123/avengers.png?updatedAt=1745265604745",
      category: NewsCategory.Video,
      keywords: ["Avengers", "Marvel", "Endgame"],
      releaseDate : "17 Apr 2024",
      videoUrl: "https://ik.imagekit.io/dimple123/avengersTrailer.mp4?updatedAt=1745265802055",
    },
    {
      heading: "Exclusive Interview with Tom Holland on Spider-Man",
      description: "Tom Holland talks about his role in Spider-Man: No Way Home and the challenges he faced.",
      image: "https://ik.imagekit.io/dimple123/spiderman.png?updatedAt=1744184320269",
      category: NewsCategory.Video,
      releaseDate : "17 Apr 2025",
      keywords: ["Spider-Man", "Tom Holland", "Interview"],
      videoUrl: "https://ik.imagekit.io/dimple123/tomHollandInterview.mp4?updatedAt=1745266217152",
    },
  ];