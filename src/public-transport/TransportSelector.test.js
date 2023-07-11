import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import * as React from "react";
import TransportSelector from "./TransportSelector";
import {useDeparturesList} from './UseDeparturesList'
// https://stackoverflow.com/questions/43500235/jest-mock-a-function-called-inside-a-react-component
jest.mock('./UseDeparturesList', () => ({ useDeparturesList: jest.fn(), MODES: ["Train", "Bus"]}))

describe('renders correctly when loading data', () =>{

    const mockSetApiKey = jest.fn();
    const mockSetMode = jest.fn();
    const mockSetStops = jest.fn();
    const mockSetStopFromId = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('can be rendered when departures are loading', () => {
        useDeparturesList.mockImplementation(mockUseDeparturesList(true))
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
        useDeparturesList.mockImplementation(mockUseDeparturesList(false, 'Unable to fetch stop predictions'))
        render(<TransportSelector />)
        // assert that error is displayed
        screen.getByText('Error: Unable to fetch stop predictions');
    })


    test('behaves correctly when an API key is entered', async () => {
        useDeparturesList.mockImplementation(mockUseDeparturesList(false));
        render(<TransportSelector />)
        await userEvent.type(screen.getByLabelText(/Metlink API Key/i), 'key');
        expect(mockSetApiKey.mock.calls).toEqual([['k'], ['e'], ['y']]);
    })

    test('behaves correctly when mode is selected', () => {
        useDeparturesList.mockImplementation(mockUseDeparturesList(false))
        render(<TransportSelector />)
        userEvent.selectOptions(
            screen.getAllByRole('combobox')[0], 'Bus'
        );
        expect(mockSetMode).toBeCalledWith('Bus')
        expect(mockSetStops).toBeCalledWith('Bus')

    })

    test('behaves correctly when stop is selected', () => {
        useDeparturesList.mockImplementation(mockUseDeparturesList(false))
        render(<TransportSelector />)
        userEvent.selectOptions(
            screen.getAllByRole('combobox')[1], 'Wellington - (WELL)'
        );
        expect(mockSetStopFromId).toBeCalledWith('WELL')
    })

    test('displays departures', () => {
        const departures = [{service_id: '454', status: 'ON_TIME',
            destination: {name: 'Johnsonville'}, departure: {expected: '2023-06-28T20:49:32+0000'}}];
        useDeparturesList.mockImplementation(mockUseDeparturesList(false, undefined, departures))
        render(<TransportSelector />)
        const headerRow = screen.getAllByRole("row", {
            name: /Service ID Status Destination Expected Departure/i
        });
        expect(headerRow.length).toBe(1)
        const tableRow = screen.getAllByRole("row", {
            name: /454 ON_TIME Johnsonville 8:49 am/i
        });
        expect(tableRow.length).toBe(1)
    })

    const mockUseDeparturesList = (isLoading = false, errorMessage = undefined, departures = []) => () => ({
                apiKey: '',
                setApiKey: mockSetApiKey,
                mode: "Train",
                setMode: mockSetMode,
                stop: {stop_id: "JOHN", name: "Johnsonville"},
                setStop: () => {
                },
                stops: [{stop_id: "JOHN", name: "Johnsonville"}, {stop_id: "RARO", name: "Raroa"}, {
                    stop_id: "WELL",
                    name: "Wellington"
                }],
                isLoading: isLoading,
                error: errorMessage === undefined ? undefined : {message: errorMessage},
                data: departures,
                setUpStops: mockSetStops,
                setStopFromId: mockSetStopFromId
            })
})