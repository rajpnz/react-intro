import {useState} from "react";


function Counter() {
    // The hook returns an array with two items: the current state value (count), and a function to update that value (setCount)
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={increment}>
                Click me
            </button>
        </div>
    );
}
export default Counter;