// src/App.jsx

import { useState, useEffect } from "react";

function App() {

  const [availableItems, setAvailableItems] = useState([
    {
      id: 1,
      name: "Black T shirt",
      price: 5
    },
    {
      id: 2,
      name: "Hanger Set",
      price: 8
    },
    {
      id: 3,
      name: "Thoub",
      price: 12
    },
    {
      id: 4,
      name: "Computer Bag",
      price: 20
    },
    {
      id: 5,
      name: "Couch",
      price: 50
    },
    {
      id: 6,
      name: "Gaming Chair",
      price: 70
    }
  ]
  )

  const [availableBalance, setAvailableBalance] = useState(100)
  const [shoppingCart, setShoppingCart] = useState([])
  const [warningMessage, setWarningMessage] = useState()

  function handleAddToCart(clickedItem) {
    if (availableBalance >= clickedItem.price) {
      const filteredItems = availableItems.filter((item) => {
        return clickedItem.id !== item.id
      })
      console.log(filteredItems)
      setAvailableItems(filteredItems)
      setShoppingCart([...shoppingCart, clickedItem])


      setAvailableBalance(availableBalance - clickedItem.price)
      setWarningMessage('')

    } else {
      setWarningMessage('Insufficient funds. Your balance is too low to purchase this item')
    }
  }

  // timer to remove the warning message 
  useEffect(() => {
    if (!warningMessage) return;

    const timer = setTimeout(() => {
      setWarningMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [warningMessage]);

   function handleRemoveFromShoppingCart(clickedItem){
   
    const filteredCart = shoppingCart.filter((item) => {
      return clickedItem.id !== item.id
    })
    setShoppingCart(filteredCart)

    
    setAvailableItems([...availableItems, clickedItem])

   
    setAvailableBalance(availableBalance + clickedItem.price)

   
    setWarningMessage('')
  }




  return (
    <>
      <h1>Sayed Hameds Closet</h1>

      <h2>Your Balance: {availableBalance}</h2>


      <h2>Available Items</h2>

      {availableItems.length > 0 ? availableItems.map((item) =>
        <div key={item.id}>
          <p>Name: {item.name}, Price: {item.price} </p>
          <button onClick={() => { handleAddToCart(item) }}>Add To Cart</button>
        </div>
      ) : "there is no available Items"}

      <h2>Shopping Cart</h2>
      {shoppingCart.length > 0 ? shoppingCart.map((item) =>
        <div key={item.id}>
          <p>Name: {item.name}, Price: {item.price} </p>
          <button onClick={() => handleRemoveFromShoppingCart(item)}>Remove</button>
        </div>) : "The cart it's Empty"}

      {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}

    </>

  );
}

export default App
