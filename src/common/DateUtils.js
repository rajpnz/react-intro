const TIME_FORMATTER = (isoDateTimeString) => {
    let formattedTime = "Unknown";
    if(isoDateTimeString) {
        const time = new Date(isoDateTimeString);
        const timeOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
        formattedTime = time.toLocaleString('en-NZ', timeOptions)
    }
    return formattedTime;
}

export {TIME_FORMATTER}