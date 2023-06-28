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
    expect(screen.getByText("Service ID")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.getByText("Expected Departure")).toBeInTheDocument();
    const cells = screen.getAllByRole('cell');

    expect(cells[0]).toHaveTextContent("454");
    expect(cells[1]).toHaveTextContent("ON_TIME");
    expect(cells[2]).toHaveTextContent("Johnsonville");
    expect(cells[3]).toHaveTextContent("8:49 am");

})