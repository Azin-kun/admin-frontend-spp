import React from "react"
import Navbar from "../component/Navbar"

export default class Product extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Product</h1>
            </div>
        )
    }
}
