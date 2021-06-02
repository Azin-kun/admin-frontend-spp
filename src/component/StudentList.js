import React from "react"
export default class StudentList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row bg-dark">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.image} src={this.props.image} 
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7 text-white">
                        {/* description */}
                        <h5 className="text-bold text-warning">student Name: {this.props.nama}</h5>
                        <h6>Number: {this.props.nis}</h6>
                        <h6>Phone: {this.props.no_telp}</h6>
                        <h6>Address: {this.props.alamat}</h6>
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
