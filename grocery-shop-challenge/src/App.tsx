import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Static array of checkout names.
  const checkouts = [
    "Checkout 1",
    "Checkout 2",
    "Checkout 3",
    "Checkout 4",
    "Checkout 5",
  ];

  // State to track user input, initialized to 0.
  const [userInput, setUserInput] = useState<number>(0);

  // Function to generate an array of random length filled with random numeric values.
  const randomItems = () => {
    const length = Math.floor(Math.random() * 5 + 1); // Random length between 1 and 5.
    return Array.from(
      { length: length },
      () => Math.floor(Math.random() * 7 + 1) // Each item is a random number between 1 and 7.
    );
  };

  // State to track items in each checkout, initialized with random items for each checkout.
  const [randomCheckoutItems, setRandomCheckoutItems] = useState(() =>
    checkouts.map(() => randomItems())
  );

  // Handles form submission.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Determine the checkout with the least sum of items.
    let leastItems = Infinity;
    let leastCheckoutIndex = -1;
    for (let i = 0; i < randomCheckoutItems.length; i++) {
      const itemSum = randomCheckoutItems[i].reduce(
        (acc, curr) => acc + curr,
        0 // Calculate sum of items for each checkout.
      );
      if (itemSum < leastItems) {
        leastItems = itemSum;
        leastCheckoutIndex = i; // Update index of checkout with least items.
      }
    }

    // Update the state to add the user input to the checkout with the least items.
    if (leastCheckoutIndex !== -1) {
      setRandomCheckoutItems((prev) =>
        prev.map((line, index) => {
          if (leastCheckoutIndex === index) {
            return [...line, userInput]; // Add userInput to the chosen checkout.
          } else {
            return line;
          }
        })
      );
    }
  };

  // Updates `userInput` state based on the form input field.
  const onChange = (e) => {
    setUserInput(e.target.valueAsNumber || 1);
  };

  // useEffect hook to decrease the value of each item in each checkout by 1 every second.
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomCheckoutItems((prevItems) => {
        return prevItems.map((checkoutItems) => {
          const updatedItems = [
            ...(checkoutItems[0] > 0
              ? [checkoutItems[0] - 1]
              : [checkoutItems[0]]),
            ...checkoutItems.slice(1),
          ].filter((value) => value > 0); // Filter out items with value > 0.
          return updatedItems;
        });
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount.
  }, []);

  return (
    <>
      <div className="App">
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <input
              onChange={onChange}
              type="number"
              placeholder="search"
              className="input"
            ></input>
            <button>checkout</button>
          </form>
        </div>
        <div className="store">
          <div className="checkouts">
            {checkouts.map((checkout, i) => (
              <div className="checkout" key={checkout}>
                {checkout}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  {/* Display items for each checkout */}
                  <div className="customer">
                    {randomCheckoutItems[i].map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
