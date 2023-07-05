import {render, screen} from "@testing-library/react";
import * as React from "react";
import TransportSelector from "./TransportSelector";
import {useDeparturesList} from './UseDeparturesList'
// https://stackoverflow.com/questions/43500235/jest-mock-a-function-called-inside-a-react-component
jest.mock('./UseDeparturesList', () => ({ useDeparturesList: jest.fn(), MODES: ["Train", "Bus"]}))

const mockUseDeparturesListLoading = () => {
    return {
        apiKey: 'xyz',
        setApiKey: () => {},
        mode: "Train",
        setMode: () => {},
        stop: {stop_id: "JOHN", name: "Johnsonville"},
        setStop: () => {},
        stops: [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}],
        isLoading: true,
        error: undefined,
        data: [],
        setUpStops: () => {},
        setStopFromId: () => {}
    }
};

const mockUseDeparturesListWithError = () => {
    return {
        apiKey: 'xyz',
        setApiKey: () => {},
        mode: "Train",
        setMode: () => {},
        stop: {stop_id: "JOHN", name: "Johnsonville"},
        setStop: () => {},
        stops: [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {stop_id: "WELL", name: "Wellington"}],
        isLoading: false,
        error: { message: "Unable to fetch stop predictions" },
        data: [],
        setUpStops: () => {},
        setStopFromId: () => {}
    }
};

describe('renders correctly when loading data', () =>{
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('can be rendered', () => {
        useDeparturesList.mockImplementation(mockUseDeparturesListLoading)
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
    test('renders correctly when there is an error', () => {
        useDeparturesList.mockImplementation(mockUseDeparturesListWithError)
        render(<TransportSelector />)
        // assert that error is displayed
        screen.getByText('Error: Unable to fetch stop predictions');
    })
})