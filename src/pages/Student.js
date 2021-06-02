import React from "react"
import Navbar from "../component/Navbar"
import StudentList from "../component/StudentList";
import { base_url, image_url } from "../config";
import $ from "jquery"
import axios from "axios"

export default class Student extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa: [],
            token: "",
            action: "",
            nama: "",
            no_telp: "",
            alamat: "",
            image: "",
            username: "",
            password: "",
            uploadFile: true,
            fillPassword: true,
            nisn: "",
            nis: "",
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

    getStudent = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({siswa: response.data})
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
        $("#modal_student").modal("show")
        this.setState({
            action: "insert",
            nisn: 0,
            nama: "",
            alamat: "",
            no_telp: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_student").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            no_telp: selectedItem.no_telp,
            alamat: selectedItem.alamat,
            image: null,
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveStudent = event => {
        event.preventDefault()
        $("#modal_Student").modal("hide")
        let form = new FormData()
        form.append("nisn", this.state.nisn)
        form.append("nis", this.state.nis)
        form.append("nama", this.state.nama)
        form.append("no_telp", this.state.no_telp)
        form.append("alamat", this.state.alamat)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getStudent()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getStudent()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getStudent()
    }

    render(){
        return (
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold mt-2">Student List</h3>
                   <div className="row">
                       { this.state.siswa.map( item => (
                           <StudentList
                           nisn = {item.nisn}
                           nis = {item.nis}
                           nama = {item.nama}
                           no_telp = {item.no_telp}
                           alamat = {item.alamat}
                           image = { image_url + "/" + item.image}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropStudent(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Student
                   </button>
                </div>

                 <div className="modal fade" id="modal_student">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-dark text-warning">
                                 <h4>Form Student</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveStudent(ev)}>
                                    Student Number
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nis}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                     />
                                     Student Name
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                     />
                                    Student Phone
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.no_telp}
                                     onChange={ev => this.setState({phone: ev.target.value})}
                                     required
                                     />
                                    Student Address
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.alamat}
                                     onChange={ev => this.setState({address: ev.target.value})}
                                     required
                                     />

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Student Image
                                        </button>
                                    ) : (
                                        <div>
                                            Student Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
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
