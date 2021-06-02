import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config";
import ClassList from "../component/ClassList"
import axios from "axios"

export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            kelas: [],
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
        let url = base_url + "/kelas"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({kelas: response.data})
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
                    <h3 className="text-bold mt-2">Class List</h3>
                    { this.state.kelas.map(item => (
                        <ClassList
                        key = {item.id_kelas}
                        nama_kelas = {item.nama_kelas}
                        kompetensi_keahlian = {item.kompetensi_keahlian}
                         />
                    )) }
                </div>
            </div>
        )
    }

}
