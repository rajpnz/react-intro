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
            mode: "Train", setMode: () => {},
            stop: {stop_id: "JOHN", name: "Johnsonville"},
            setStop: () => {},
            stops: [],
        isLoading: true,
            error: true,
            data: [],
            setUpStops: () => {},
            setStopFromId: () => {}
        }},
    MODES: ["Train", "Bus"],
}));

describe('Transport selector test', () =>{
    afterAll(() => {
        jest.resetAllMocks();
    });

    test('can be rendered', () => {
        render(<TransportSelector />)
        screen.debug();
    })
    test('renders correctly when loading data', () => {
        // TODO
    })
})