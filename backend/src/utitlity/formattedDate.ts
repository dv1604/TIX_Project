export const formattedDate = (dateOffset : number) => {
    const today = new Date();

    today.setDate(today.getDate() + dateOffset);

    return {
        date : today.getDate(),
        day : today.toLocaleString('en-IN' , {weekday : 'long'}),
        month : today.toLocaleString('en-IN' , {month : 'long'}),
        year : today.getFullYear()
    }
}