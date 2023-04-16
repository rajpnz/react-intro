const StopDepartures = (props) => {

    function formatTime(isoDateTimeString) {
        let formattedTime = "Unknown";
        if(isoDateTimeString) {
            const time = new Date(isoDateTimeString);
            const timeOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
            formattedTime = time.toLocaleString('en-NZ', timeOptions)
        }
        return formattedTime;
    }
    return (
        <div>
            <table>
                <tr>
                    <th>Service ID</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Expected Departure</th>
                </tr>
                {props.stopDepartures?.map((departure) => {
                    return (
                    <tr>
                        <td>{departure.service_id}</td>
                        <td>{departure.status}</td>
                        <td>{departure.destination.name}</td>
                        <td>{formatTime(departure.departure.expected)}</td>
                    </tr>
                )})}
            </table>
        </div>
    );
};

export default StopDepartures;