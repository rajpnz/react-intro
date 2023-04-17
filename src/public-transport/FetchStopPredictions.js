async function fetchStopPredictions({ queryKey }) {
    const stopId = queryKey[1];
    const mode = queryKey[2];
    const apiKey = queryKey[3];

    if(apiKey && mode && stopId) {
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
        if(!res.ok) {
            throw new Error(`Could not fetch sop predictions for ${stopId} `);
        }
        return json.departures;
    } else {
        return [];
    }
}

export default fetchStopPredictions;