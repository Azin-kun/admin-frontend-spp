import React from "react";
export default class ClassList extends React.Component{
    render(){
        return (
            <div>
                {/* list */}
                <div className="card col-sm-12 my-1">
                    <div className="card-body row bg-dark">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-warning">Year:</small>
                            <h6 className="text-white">{this.props.tahun}</h6>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-warning">Nominal:</small>
                            <h6 className="text-white">{this.props.nominal}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
