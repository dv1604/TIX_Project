export const generateUpcomingDates = () => {
        const today = new Date();
        return Array.from({ length: 8 }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() + i);
            return {
                date: date.getDate(),
                day: date.toLocaleString('en-IN', { weekday: 'short' }),
                month: date.toLocaleString('en-IN', { month: 'short' }),
                disabled: i >= 5
            };
        });
    };