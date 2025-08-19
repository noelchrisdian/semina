const formatDate = (date) => {
    const d = new Date(date);
    const dateFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    })
    const [{ value: month }, , { value: day }] = dateFormat.formatToParts(d);
    
    return `${day} ${month}` 
}

export { formatDate };