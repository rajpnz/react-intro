import {useState} from "react";


function Counter() {
    // The hook returns an array with two items: the current state value (count), and a function to update that value (setCount)
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    function countAsText() {
        let text;
        switch (count) {
            case 1:
                text = "one"
                break;
            case 2:
                text = "two"
                break;
            case 3:
                text = "three"
                break;
            case 4:
                text = "four"
                break;
            default:
                text = count
        }
        return text
    }

    return (
        <div>
            <p>You clicked {countAsText()} times</p>
            <button onClick={increment}>
                Click me
            </button>
        </div>
    );
}
export default Counter;