import {useState} from "react";
const MODES = ["Train", "Bus"];
const TRAIN_STOPS = [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}]
const BUS_STOPS = [{stop_id: "3081", name: "Johnsonville Mall"}, {stop_id: "3252", name: "BP Johnsonville"},
    {stop_id: "5012", name: "Lambton Central - Stop A"}, {stop_id: "5016", name: "Wellington Station - Stop E"}]

function TransportSelector() {
    const [apiKey, setApiKey] = useState("");
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

    async function requestStopDeparturePredictions(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const stopId = event.target.options[selectedIndex].getAttribute('data-key');
        const headers = new Headers();
        headers.append('accept', 'application/json');
        headers.append('x-api-key', apiKey);
        const res = await fetch(
            `https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=${stopId}`, {
                method: 'GET',
                headers: headers,
            }
        );
        const json = await res.json();
        console.log(json)
    }
    return (
        <div className="transport-selector">
            <form>
                <label htmlFor="api-key">
                    Metlink API Key
                </label>
                <input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <br/>
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
                    onChange={(e) =>{
                        setStop(e.target.value)
                        requestStopDeparturePredictions(e);
                }}
                >
                    {stops.map((oneStop) =>
                        (
                        <option key={oneStop.stop_id} data-key={oneStop.stop_id} value={oneStop.name}>
                            {`${oneStop.name} - (${oneStop.stop_id})`}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}
export default TransportSelector;