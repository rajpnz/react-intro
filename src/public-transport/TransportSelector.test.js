import {render, screen} from "@testing-library/react";
import * as React from "react";
import TransportSelector from "./TransportSelector";

const {useDeparturesList} = require('./UseDeparturesList')
// see https://stackoverflow.com/questions/66288290/jest-mock-nested-function-from-another-file
jest.mock('./UseDeparturesList', () => ({
    useDeparturesList: () =>{
        return {
            apiKey: 'xyz',
            setApiKey: () => {},
            mode: "Train",
            setMode: () => {},
            stop: {stop_id: "JOHN", name: "Johnsonville"},
            setStop: () => {},
            stops: [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}],
        isLoading: true,
            error: false,
            data: [],
            setUpStops: () => {},
            setStopFromId: () => {}
        }},
    MODES: ["Train", "Bus"],
}));

describe('renders correctly when loading data', () =>{
    afterAll(() => {
        jest.resetAllMocks();
    });

    test('can be rendered', () => {
        render(<TransportSelector />)

        // assert that the selected mode is Train
        screen.getByDisplayValue('Train');

        // assert that all the mode options are available
        expect(screen.getByText("Train")).toBeInTheDocument();
        expect(screen.getByText("Bus")).toBeInTheDocument();

        // assert that the selected stop is Johnsonville
        screen.getByDisplayValue('Johnsonville - (JOHN)');

        // assert all the stop options are available
        expect(screen.getByText("Johnsonville - (JOHN)")).toBeInTheDocument();
        expect(screen.getByText("Raroa - (RARO)")).toBeInTheDocument();
        expect(screen.getByText("Wellington - (WELL)")).toBeInTheDocument();

        // assert that isLoading text is displayed
        screen.getByText('Loading......');

        // screen.debug();
    })
    test('renders correctly', () => {
        // TODO
    })
})