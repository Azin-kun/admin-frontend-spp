import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config";
import ClassList from "../component/TuitionList"
import axios from "axios"

export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            spp: [],
            selectedItem: null
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getclass = () => {
        let url = base_url + "/spp"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({spp: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getclass()
    }

    render(){
        return (
            <div>
                <Navbar />

                <div className="container">
                    <h3 className="text-bold mt-2">Tuition List</h3>
                    { this.state.spp.map(item => (
                        <ClassList
                        key = {item.id_spp}
                        tahun = {item.tahun}
                        nominal = {item.nominal}
                         />
                    )) }
                </div>
            </div>
        )
    }

}
