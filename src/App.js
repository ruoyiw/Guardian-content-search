import React, { Component } from "react";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import moment from "moment";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // array to store all content information
      allContent: [],
      // array to store searched content information
      filteredContent: [],
      // array to store pinned content items
      pinnedContent: [],
      // if there is content info to display
      hasContentInfo: true,
      // error information
      error: null
    }
    this.handleFilterContent = this.handleFilterContent.bind(this);
    this.handlePinned = this.handlePinned.bind(this);
  }
  
  componentDidMount() {
    this.handleGetContent();
  }

  /*
   * get the content data from API
   */
  async handleGetContent () {
     let url = "https://content.guardianapis.com/search?q=debates&api-key=test"
     await axios.get(url)
    .then(response => {
      if (response.data.response.status === "ok") {
        let pinnedJSON = {"isPinned": false};
        let results = response.data.response.results;
        results.map(item => (
          item = Object.assign(item, pinnedJSON)
        ));
        this.setState({
          allContent: results,
          filteredContent: results,
          hasContentInfo: true
        });
      } else {
        this.setState({
          hasContentInfo: false,
          error: "Failure in getting debate content."
        });        
      }
    }).catch(err => {
      this.setState({
        hasContentInfo: false,
        error: err.toString()
      });   
    });
  }
  
  /*
   * store the pinned items and add them in the searched content
   */
  handlePinned(id) {
    const { filteredContent } = this.state;
    filteredContent[id].isPinned = !filteredContent[id].isPinned;
    const pinned = filteredContent.filter(item => item.isPinned);
    this.setState ({
      pinnedContent: pinned,
      filteredContent: filteredContent
    });
  }
  
  /*
   * perform search based on user input
   */
  handleFilterContent(input) {
    const { allContent, pinnedContent } = this.state;
    // filter unpinned items
    const unpinned = allContent.filter(function(item) {
        return pinnedContent.indexOf(item) === -1
    });
    // perform search within the unpinned items against the whole API content
    const searchedContent = unpinned.filter(item => (
        item.id.toLowerCase().includes(input.toLowerCase()) ||
        item.type.toLowerCase().includes(input.toLowerCase()) ||
        item.sectionId.toLowerCase().includes(input.toLowerCase()) ||
        item.sectionName.toLowerCase().includes(input.toLowerCase()) ||
        moment(item.webPublicationDate).format("DD/MM/YYYY").includes(input) ||
        item.webTitle.toLowerCase().includes(input.toLowerCase()) ||
        item.webUrl.toLowerCase().includes(input.toLowerCase()) ||
        item.apiUrl.toLowerCase().includes(input.toLowerCase()) ||
        item.isHosted.toString().includes(input.toLowerCase()) ||
        item.pillarId.toLowerCase().includes(input.toLowerCase()) ||
        item.pillarName.toLowerCase().includes(input.toLowerCase())
      ))
    // concat the pinned items behind the searched content
    this.setState ({
      filteredContent: searchedContent.concat(pinnedContent)
    });     
  }

  render() {
    const { filteredContent, hasContentInfo, error } = this.state;
    // if the content data is gotten and no error occurred, render the webpage; else render the error message
    if (hasContentInfo && !error) {
      return (
      <div className="container-fluid" style={{textAlign: "center"}}>
      {/* title */}
      <div
          className="titleRow"
          style={{
              color: "#4ac48f",
              fontSize: "30px",
              fontWeight: "bold"
          }}
      >
      Guardian Content
      </div>
      <br/>

      <div className="row justify-content-center">
        <div className="col-4">
           <Filter onChange={this.handleFilterContent} />
        </div>
      </div>
      
      <br/>
      {/* if the searched content can be found, list them as table; else 
          return "No matched result"
      */}
      {filteredContent.length > 0 ? (
      <div 
        className="table-responsive"
        style={{
          width: "90%",
          margin: "auto"
        }}
      > 
        <table className="table table-striped text-centered">
        <thead>
          <tr>
            <th style={{width: "5%"}}>Bookmark</th>
            <th style={{width: "35%"}}>Title</th>
            <th style={{width: "40%"}}>Link</th>
            <th style={{width: "20%"}}>Publication Date</th>
          </tr>
        </thead>
        <tbody>
        {filteredContent.map(item => (
          <tr key={item.id}>    
            <td>    
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="bookmark" 
                onChange={() => this.handlePinned(filteredContent.indexOf(item))}
                checked={item.isPinned}
              />
            </td>
            <th>{item.webTitle}</th>
            <td>{item.webUrl}</td>
            <td>{moment(`${item.webPublicationDate}`).format("DD/MM/YYYY")}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      ) : <p className="text-muted">No matched result</p>
      }
      </div>
    );
  } else {
    return <div>{error}</div>;
  }
  }
}

export default App;


