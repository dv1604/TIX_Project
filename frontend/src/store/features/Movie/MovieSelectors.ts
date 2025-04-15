import { RootState } from "../../store";

export const filteredTheatres = (state: RootState) => {
    const { selectedMovie, selectedCity, selectedChain, selectedStudio, searchTheatre } = state.movie;

    const cityData = selectedMovie.city.find((city) => city.name === selectedCity);

    if (!cityData) return [];

    return cityData.theatres.filter((theatre) => {
        const matchChain = selectedChain === 'All' || theatre.chain === selectedChain;

        // Check if a studio is selected and filter the screens based on the selected type
        const matchStudio = selectedStudio
            ? theatre.screens.some((screen) => screen.type.toUpperCase() === selectedStudio.toUpperCase())
            : true; // If no studio is selected, return true for all theatres

        const matchSearch = searchTheatre
            ? theatre.name.toLowerCase().includes(searchTheatre.toLowerCase()) ||
            theatre.location.toLowerCase().includes(searchTheatre.toLowerCase())
            : true;

        return matchChain && matchStudio && matchSearch;
    }).map((theatre) => {
        // If a studio is selected, filter the screens that match the selected studio
        if (selectedStudio) {
            const filteredScreens = theatre.screens.filter((screen) => screen.type.toUpperCase() === selectedStudio.toUpperCase());
            return { ...theatre, screens: filteredScreens }; // Return a new object with updated screens
        }
        return theatre;
    });
};
