import React, { useState } from "react"
import Products from "./products"
import classes from './adminDashboard.module.css'
const AdminDashboard = () => {
    return (
        <div className={classes.products_div}>
            <h1>This is a Admin dashboard</h1>
            <Products />
        </div>
    )
}
export default AdminDashboard;