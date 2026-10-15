//DAY 27 n 28

//validator

import PropTypes from "prop-types";

function Dish({ name, price, spicy }) {
    return <p>{name}: {price} ETB</p>;
}
Dish.propTypes = {
    name:  PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,        
};

//condition
//#1
function DishStatus({ available }) {
    return (
    <p>
        {available
        ? "Available now"   //if true do this
        : "Sold out"}       //else do this
    </p>
    );
}

//#2
function Dish({ name, spicy }) {
    return (
    <div>
        <h3>{name}</h3>
        {spicy && <span>Spicy</span>}   //When you want to render something only if a condition is true — with no "else" — use &&. If the left side is true, the right side renders; if false, nothing does.
    </div>
    );
}

//Loading, empty & error states
function Menu({ loading, error, dishes }) {
    if (loading) return <p>Loading menu...</p>;
    if (error)   return <p>Could not load.</p>;
    if (dishes.length === 0)
        return <p>No dishes found.</p>;
    return <DishList dishes={dishes} />;
}


//Rendering a list with map

function Menu({ dishes }) {
    return (
    <div className="menu">
        {dishes.map(dish => <Dish key={dish.id} {...dish} />
    )}
    </div>
    );
}

//Filter, then map
function Menu({ dishes, category }) {
    const shown = dishes.filter(d => d.category === category);
    if (shown.length === 0)
        return <p>No {category} dishes.</p>;
    return shown.map(d => <Dish key={d.id} {...d} />
    );
}


//DAY 28


//to increment a counter

import { useState } from "react";

function OrderCounter() {
    const [count, setCount] = useState(0);
  //     value   updater     initial value

    return (
    <button onClick={() => setCount(count + 1)}>
        Orders today: {count}
    </button>
    );
}


//Several pieces of state --- state is not shared between instances

const [count, setCount]       = useState(0);
const [category, setCategory] = useState("All");
const [isOpen, setIsOpen]     = useState(false);
const [dishes, setDishes]     = useState([]);

//                 Handling Events


function OrderButton() {
    function handleClick() {
        alert("Doro Wat added to your order");
    }
    return <button onClick={handleClick}>Order</button>;
}

// same thing, written inline:
<button onClick={() => alert("Added")}>Order</button>

//Handlers that take arguments

function Menu({ dishes }) {
    const [total, setTotal] = useState(0);
    function addToOrder(price) {
        setTotal(total + price);
    }
    return dishes.map(dish => (
    <button key={dish.id} onClick={() => addToOrder(dish.price)}>
        {dish.name} — {dish.price} ETB
    </button>
));
}

//The event object

function SearchBox() {
    function handleChange(event) {
        console.log(event.target.value);   
    }
    function handleSubmit(event) {
        event.preventDefault();           
    }
    return <input onChange={handleChange} />;
}