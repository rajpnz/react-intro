import * as React from 'react'
import {render, screen} from '@testing-library/react'
import StopDepartures from "./StopDepartures";

test('stop departures can be rendered with no departures', () => {
    const {container} = render(<StopDepartures />)
    expect(screen.getByText("Service ID")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.getByText("Expected Departure")).toBeInTheDocument();
    // below outputs the dom to the console
    // screen.debug()
})


test('stop departures are rendered', () => {
    // arrange
    const departures = [{service_id: '454', status: 'ON_TIME',
        destination: {name: 'Johnsonville'}, departure: {expected: '2023-06-28T20:49:32+0000'}}];

    // act
    render(<StopDepartures stopDepartures={departures}/>)

    // assert
    const headerRow = screen.getAllByRole("row", {
        name: /Service ID Status Destination Expected Departure/i
    });
    expect(headerRow.length).toBe(1)
    const tableRow = screen.getAllByRole("row", {
        name: /454 ON_TIME Johnsonville 8:49 am/i
    });
    expect(tableRow.length).toBe(1)
})