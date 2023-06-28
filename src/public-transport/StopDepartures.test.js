import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import StopDepartures from "./StopDepartures";

test('stop departures can be rendered', () => {
    const {container} = render(<StopDepartures />)
    screen.debug()
})