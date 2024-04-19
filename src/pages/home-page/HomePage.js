import React from "react"
import Products from "../Products/products"
import classes from "./HomePage.module.css";
const HomePage = () => {
    return (
        <div className={classes.products_div}>
            <Products />
        </div>
    )
}
export default HomePage;