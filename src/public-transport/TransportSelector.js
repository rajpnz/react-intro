import {useState} from "react";
import StopDepartures from "./StopDepartures";
import { useQuery } from "@tanstack/react-query";
import fetchStopPredictions from "./FetchStopPredictions";

const MODES = ["Train", "Bus"];
const TRAIN_STOPS = [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}]
const BUS_STOPS = [{stop_id: "3081", name: "Johnsonville Mall"}, {stop_id: "3252", name: "BP Johnsonville"},
    {stop_id: "5012", name: "Lambton Central - Stop A"}, {stop_id: "5016", name: "Wellington Station - Stop E"}]

function TransportSelector() {

    const [departures, setDepartures] = useState();
    const [apiKey, setApiKey] = useState("");
    const [mode, setMode] = useState("");
    const [stop, setStop] = useState("");
    const [stops, setStops] = useState([]);
    const [stopId, setStopId] = useState("");

    if(!mode) {
        const defaultMode = MODES[1];
        setMode(defaultMode)
        setUpStops(defaultMode)
    }
    const { isLoading, error} = useQuery(['stop-predictions', stopId, mode, apiKey],
        fetchStopPredictions , {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 20000,
        onSuccess: (data) => {setDepartures(data)}
    });


    function setUpStops(typeOfTransport){
        let stopsFromTransport;
        if (typeOfTransport === "Train") {
            stopsFromTransport = TRAIN_STOPS;
        } else if (typeOfTransport === "Bus") {
            stopsFromTransport = BUS_STOPS;
        }
        setStops(stopsFromTransport);
        // arbitrarily pre-select the 1st stop
        const stopToSelect = stopsFromTransport[0];
        setStopId(stopToSelect.stop_id);
        setStop(stopToSelect.name)
    }

    function setStopIdFromEvent(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const stopIdFromEvent= event.target.options[selectedIndex].getAttribute('data-key');
        setStopId(stopIdFromEvent)
    }

    function showQueryResults() {
        if(isLoading) {
            return <span>Loading......</span>;
        } else if (error) {
            return <span>{`Error: ${error.message}`}</span>;
        } else if (departures != undefined && departures.length > 0) {
            return <StopDepartures stopDepartures={departures}/>;
        }
    }

    return (
        <div className="transport-selector">
            <form>
                <label htmlFor="api-key">
                    Metlink API Key
                </label>
                <input
                    id="api-key"
                    type="password"
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
                    onChange={(e) =>{
                        setStop(e.target.value)
                        setStopIdFromEvent(e);
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
            <br/>
            {showQueryResults()}
        </div>
    );
}
export default TransportSelector;