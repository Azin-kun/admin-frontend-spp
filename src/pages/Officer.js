import React from "react"
import Navbar from "../component/Navbar"
import OfficerList from "../component/OfficerList";
import { base_url, image_url } from "../config";
import $ from "jquery"
import axios from "axios"

export default class Officer extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas: [],
            token: "",
            action: "",
            nama_petugas: "",
            username: "",
            password: "",
            image: "",
            level: "",
            uploadFile: true,
            fillPassword: true,
            id_petugas: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getOfficer = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugas: response.data})
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

    Add = () => {
        $("#modal_officer").modal("show")
        this.setState({
            action: "insert",
            nama_petugas: "",
            username: "",
            password: "",
            image: 0,
            level: "",
            uploadFile: true,
            fillPassword: true,
            id_petugas: 0,
        })
    }

    Edit = selectedItem => {
        $("#modal_officer").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            username: selectedItem.username,
            password: selectedItem.password,
            image: null,
            level: selectedItem.level,
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveOfficer = event => {
        event.preventDefault()
        $("#modal_officer").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("nama_petugas", this.state.name)
        form.append("username", this.state.phone)
        form.append("level", this.state.address)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }

        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getOfficer()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getOfficer()
            })
            .catch(error => console.log(error))
        }
    }

    dropOfficer = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getOfficer()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getOfficer()
    }

    render(){
        return (
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold mt-2">Officer List</h3>
                   <div className="row">
                       { this.state.petugas.map( item => (
                           <OfficerList
                           key = {item.id_petugas}
                           nama_petugas = {item.nama_petugas}
                           username = {item.username}
                           password = {item.password}
                           level = {item.level}
                           image = { image_url + "/" + item.image}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropOfficer(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Officer
                   </button>
                </div>

                 {/* modal officer  */}
                 <div className="modal fade" id="modal_officer">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Officer</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveOfficer(ev)}>
                                     Officer Name
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_petugas}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                     />
                                     Username
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({phone: ev.target.value})}
                                     required
                                     />
                                     Level
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.level}
                                     onChange={ev => this.setState({address: ev.target.value})}
                                     required
                                     />
                                    
                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Officer Image
                                        </button>
                                    ) : (
                                        <div>
                                            Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            required
                                            />
                                        </div>
                                    ) }

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                        onClick={() => this.setState({fillPassword: true})}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                            />
                                        </div>
                                    ) }
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }

}
