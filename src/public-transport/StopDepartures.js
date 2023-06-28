import {TIME_FORMATTER} from "../common/DateUtils";
const StopDepartures = (props) => {

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Service ID</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Expected Departure</th>
                </tr>
                </thead>
                <tbody>
                {props.stopDepartures?.map((departure, index) => {
                    return (
                    <tr key={index}>
                        <td>{departure.service_id}</td>
                        <td>{departure.status}</td>
                        <td>{departure.destination.name}</td>
                        <td>{TIME_FORMATTER(departure.departure.expected)}</td>
                    </tr>
                )})}
                </tbody>
            </table>
        </div>
    );
};

export default StopDepartures;