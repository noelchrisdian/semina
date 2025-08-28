const handlerFormatDate = (date) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    })

    const [{ value: month }, , { value: day }, , { value: year }] = dtf.formatToParts(d);

    return `${day} ${month} ${year}`;
}

export { handlerFormatDate };