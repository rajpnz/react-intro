import StopDepartures from "./StopDepartures";
import {useDeparturesList} from "./UseDeparturesList";
import {MODES} from "./UseDeparturesList";

function TransportSelector() {

    const {apiKey, setApiKey, mode, setMode, stop, setStop, stops, isLoading,
        error, data, setUpStops} = useDeparturesList();

    function setStopFromEvent(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const stopIdFromEvent= event.target.options[selectedIndex].getAttribute('data-key');
        const stopName = event.target.value;
        const selectedStop = {stop_id: stopIdFromEvent, name: stopName};
        setStop(selectedStop)
    }

    function showQueryResults() {
        if(isLoading) {
            return <span>Loading......</span>;
        } else if (error) {
            return <span>{`Error: ${error.message}`}</span>;
        } else if (data != undefined && data.length > 0) {
            return <StopDepartures stopDepartures={data}/>;
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
                    value={stop.name}
                    onChange={(e) =>{
                        setStop(e.target.value)
                        setStopFromEvent(e);
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