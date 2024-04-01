import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const checkouts = [
    "Checkout 1",
    "Checkout 2",
    "Checkout 3",
    "Checkout 4",
    "Checkout 5",
  ];

  const [userInput, setUserInput] = useState<number>(0);

  //TODO: For each checkout, generate an array of random length, fill with random numeric values

  const randomItems = () => {
    const length = Math.floor(Math.random() * 5 + 1);
    return Array.from({ length: length }, () =>
      Math.floor(Math.random() * 7 + 1)
    );
  };

  const [randomCheckoutItems, setRandomCheckoutItems] = useState(() =>
    checkouts.map(() => randomItems())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: Track the sum of items for each corresponding Checkout
    let leastItems = Infinity;
    let leastCheckoutIndex = -1;
    for (let i = 0; i < randomCheckoutItems.length; i++) {
      const itemSum = randomCheckoutItems[i].reduce(
        (acc, curr) => acc + curr,
        0
      );
      if (itemSum < leastItems) {
        leastItems = itemSum;
        leastCheckoutIndex = i;
      }
    }

    if (leastCheckoutIndex !== -1) {
      setRandomCheckoutItems((prev) =>
        prev.map((line, index) => {
          if (leastCheckoutIndex === index) {
            return [...line, userInput];
          } else {
            return line;
          }
        })
      );
    }
  };

  const onChange = (e) => {
    setUserInput(e.target.valueAsNumber || 0);
  };

  //TODO: for each item in each checkout, decrease the values by 1 each 1 second

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomCheckoutItems((prevItems) => ([prevItems[0]-1,prevItems.slice(1)]));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // Since the effect does not depend on changing values but just sets up an interval, no dependencies are needed here.
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
                  <div className="customer">
                    {randomCheckoutItems[i].map((item, i) => (
                      <p key={i}>{item}</p>
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
