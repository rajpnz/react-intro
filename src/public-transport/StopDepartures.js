const StopDepartures = (props) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Service ID</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Expected Departure</th>
                </tr>
                {props.stopDepartures?.map((departure) => (
                    <tr>
                        <td>{departure.service_id}</td>
                        <td>{departure.status}</td>
                        <td>{departure.destination.name}</td>
                        <td>{departure.departure.expected}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default StopDepartures;