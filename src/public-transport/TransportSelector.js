import {useState} from "react";
const MODES = ["Train", "Bus"];
const TRAIN_STOPS = [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "2", name: "Raroa"}, {stop_id: "3", name: "Wellington"}]
const BUS_STOPS = [{stop_id: "4", name: "Johnsonville Mall"}, {stop_id: "3252", name: "BP Johnsonville"},
    {stop_id: "5502", name: "Lambton Quay"}, {stop_id: "5", name: "Wellington Station"}]

function TransportSelector() {
    const [mode, setMode] = useState("");
    const [stop, setStop] = useState("");
    const [stops, setStops] = useState([]);

    function setUpStops(typeOfTransport){
        if (typeOfTransport === "Train") {
            setStops(TRAIN_STOPS);
        } else if (typeOfTransport === "Bus") {
            setStops(BUS_STOPS)
        }
    }

    return (
        <div className="transport-selector">
            <form>
                <label htmlFor="mode">
                    Type of Transport
                </label>
                <select
                    id="mode"
                    value={mode}
                    onChange={(e) => {
                        setMode(e.target.value);
                        setUpStops(e.target.value);
                    }}
                    onBlur={(e) => {
                        setMode(e.target.value);
                    }}
                >
                    {MODES.map((oneMode) => (
                        <option key={oneMode} value={oneMode}>
                            {oneMode}
                        </option>
                    ))}
                </select>
                <br/>
                <label htmlFor="stop">
                    Stop
                </label>
                <select
                    disabled={!stops.length}
                    id="stop"
                    value={stop}
                    onChange={(e) => setStop(e.target.value)}
                    onBlur={(e) => setStop(e.target.value)}
                >
                    {stops.map((oneStop) =>
                        (
                        <option key={oneStop.stop_id} value={oneStop.name}>
                            {`${oneStop.name} - (${oneStop.stop_id})`}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}
export default TransportSelector;