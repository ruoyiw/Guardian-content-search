import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

class Filter extends Component{

   /*
    * parse the input text from the input field to the parent component
    */
    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render(){
        return(
        <form>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="textInput" 
              placeholder="Search content"
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </form>
        );
    }
}
export default Filter;