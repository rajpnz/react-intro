import {useQuery} from "@tanstack/react-query";
import fetchStopPredictions from "./FetchStopPredictions";
import {useState} from "react";

export const MODES = ["Train", "Bus"];
const TRAIN_STOPS = [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}]
const BUS_STOPS = [{stop_id: "3081", name: "Johnsonville Mall"}, {stop_id: "3252", name: "BP Johnsonville"},
    {stop_id: "5012", name: "Lambton Central - Stop A"}, {stop_id: "5016", name: "Wellington Station - Stop E"}]

export const useDeparturesList = () => {
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

    const { isLoading, error, data} = useQuery(['stop-predictions', stopId, mode, apiKey],
        fetchStopPredictions , {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 20000,
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
    return {apiKey, setApiKey, mode, setMode, stop, setStop, stops,
         setStopId, isLoading, error, data, setUpStops};
};
