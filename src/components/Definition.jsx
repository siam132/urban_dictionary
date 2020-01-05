import React from "react";

function Definition(props) {
  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12">
          <div className="card-text">
            <h3 className="defintion_header"> Defintion</h3>
            <p className="definition_text py-2">{props.obj.definition}</p>
            <h4 className="example_header">Example</h4>
            <p className="example_text">{props.obj.example}</p>
            <h6 className="text-muted">Author: {props.obj.author}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Definition;
