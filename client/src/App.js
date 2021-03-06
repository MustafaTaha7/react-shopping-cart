
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter/Filter';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import data from './data.json'
function App() {

  const [products, setproducts] = useState(data);
  const [FilteredProducts, setFilteredProducts] = useState(data);
  const [sort, setSort] = useState('');
  const [size, setSize] = useState('');
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])

  const handlefilterBySize = (e) => {
    setSize(e.target.value);
    if (e.target.value == "ALL") {
      setFilteredProducts(data)
    } else {
      let productsCLone = [...products];
      let newProducts = productsCLone.filter(p => p.size.indexOf(e.target.value) != -1);
      setFilteredProducts(newProducts);
    }

  }
  const handlefilterByOrder = (e) => {
    let order = e.target.value;
    setSort(order);
    let productClone = [...FilteredProducts];
    let newProducts = productClone.sort(function (a, b) {
      if (order == "lowest") {
        return a.price - b.price
      } else if (order == "highest") {
        return b.price - a.price
      } else {
        return a.id < b.id ? 1 : -1
      }
    })
    setFilteredProducts(newProducts)
  }
  const addToCart = (propduct) => {
    const cartItemsClone = [...cartItems]
    let isPropductExist = false;
    cartItemsClone.forEach(p => {
      if (p.id == propduct.id) {
        p.qty++;
        isPropductExist = true
      }
    })
    if (!isPropductExist) {
      cartItemsClone.push({ ...propduct, qty: 1 })
    }
    setcartItems(cartItemsClone);
  }
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

  }, [cartItems])
  
  const removeFromCart = (propduct) => {
    const cartItemsClone = [...cartItems]
    setcartItems(cartItemsClone.filter(p => p.id != propduct.id))

  }

  return (
    <div className="layout">
      <Header />
      <main>
        <div className="wrapper">
          <Products products={FilteredProducts} addToCart={addToCart} />
          <Filter
            handlefilterBySize={handlefilterBySize}
            size={size}
            handlefilterByOrder={handlefilterByOrder}
            sort={sort}
            productNumber={FilteredProducts.length}
          />
        </div>
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
