import React from "react"

export default class CustomerList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row bg-dark">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.name} src={this.props.image} 
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7 text-white">
                        {/* description */}
                        <h5 className="text-bold text-warning">officer Name: {this.props.nama_petugas}</h5>
                        <h6>username: {this.props.username}</h6>
                        <h6>password: {this.props.password}</h6>
                        <h6>level: {this.props.level}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-primary btn-block"
                        onClick={this.props.onEdit}>
                            Edit
                        </button>

                        <button className="btn btn-sm btn-danger btn-block"
                        onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
