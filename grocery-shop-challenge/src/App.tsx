import "./App.css";

function App() {
  const checkouts = [
    "Checkout 1",
    "Checkout 2",
    "Checkout 3",
    "Checkout 4",
    "Checkout 5",
  ];

  const randomCustomers = () => {
    const length = Math.floor(Math.random() * 5 + 1);
    return new Array(length).fill(0).map(() => ({
      items: randomItems(),
    }));
  };
  const randomItems = () => {
    return Math.floor(Math.random() * 5 + 1);
  };

  const checkoutData = checkouts.map((checkout) => ({
    checkout,
    customers: randomCustomers(),
  }));

  const leastItems = () => {
    let leastItems = Infinity
    for (const checkout of checkoutData) {
      const itemSum = checkout.customers.reduce((acc, curr) => {
        const currentValue = Object.values(curr)[0];
        return acc + currentValue;
      }, 0);
      if(itemSum<leastItems){
        leastItems=itemSum
      }
    }
    console.log(leastItems)
  };
  leastItems();
  return (
    <>
      <div className="App">
        <div className="input-box">
          <input placeholder="search" className="input"></input>
          <button>checkout</button>
        </div>
        <div className="store">
          <div className="checkouts">
            {checkoutData.map(({ checkout, customers }) => (
              <div className="checkout" key={checkout}>
                {checkout}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  {customers.map((customer) => (
                    <div key={customer.items} className="customer">
                      {customer.items}
                    </div>
                  ))}
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
