import {useState} from "react";
const MODES = ["Train", "Bus"];

function TransportSelector() {
    const [mode, setMode] = useState("");

    return (
        <div>
            <form>
                <label htmlFor="mode">
                    Type of Transport
                    <select
                        id="mode"
                        value={mode}
                        onChange={(e) => {
                            setMode(e.target.value);
                        }}
                        onBlur={(e) => {
                            setMode(e.target.value);
                        }}
                    >
                        <option />
                        {MODES.map((oneMode) => (
                            <option key={oneMode} value={oneMode}>
                                {oneMode}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
        </div>
    );
}
export default TransportSelector;