import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            petugasName: null,
            kelasCount: 0,
            petugasCount: 0,
            pembayaranCount: 0,
            siswaCount: 0,
            sppCount: 0
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

    getkelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({kelasCount: response.data.length})
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

    getpetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugasCount: response.data.length})
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

    getpembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaranCount: response.data.length})
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

    getsiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({siswaCount: response.data.length})
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

    getspp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({sppCount: response.data.length})
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

    getNamePetugas = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({petugasName: petugas.username})
    }

    componentDidMount(){
        this.getpetugas()
        this.getpembayaran()
        this.getkelas()
        this.getsiswa()
        this.getspp()
        this.getNamePetugas()
        
    }

    render(){
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>officer Count</strong>
                                    </h4>
                                    <h1 className="text-warning">
                                        <strong>{this.state.petugasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>class Count</strong>
                                    </h4>
                                    <h1 className="text-warning">
                                        <strong>{this.state.kelasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>payment Count</strong>
                                    </h4>
                                    <h1 className="text-warning">
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>student Count</strong>
                                    </h4>
                                    <h1 className="text-warning">
                                        <strong>{this.state.siswaCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>tuition Count</strong>
                                    </h4>
                                    <h1 className="text-warning">
                                        <strong>{this.state.sppCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}