import React, { Component } from "react";
import Definiton from "../components/Definition";
import Loading from "../components/Loading";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word_query: " ",
      definition: [],
      isLoading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //Fetches a response after every input
    let result;

    result = await fetch(
      //asynchronous action
      `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${this.state.word_query}`, //string interpolation
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
          "x-rapidapi-key": "0007dada25msh9f1dc80e5f7b262p14929cjsna459a44c8270"
        }
      }
    )
      .then(response => {
        //handling promise after getting a response
        console.log(response);
        return response.json();
      })
      .catch(err => {
        //handling error
        console.log(err);
      });

    this.setState({
      //updating the state after getting a response from the api
      definition: result.list,
      isLoading: false
    });

    console.log(this.state.definition);
  }

  handleChange(event) {
    //updating the state based on UI input
    this.setState({ word_query: event.target.value });
  }

  handleSubmit(event) {
    //triggering a re-render after input
    console.log(`You have submitted ${this.state.word_query}`);
    this.componentDidMount();
    event.preventDefault();
  }

  render() {
    if (this.state.isLoading)
      //UI loading screen while fetching data or any delay
      return (
        <div>
          Loading...<br></br>
          <Loading />
        </div>
      );
    return (
      <div className="container-fluid App-header">
        <div className="col-8">
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <label className="urban_dictionary">Urban dictionary</label>
              <input
                className="form-control"
                type="text"
                value={this.state.word_query}
                onChange={this.handleChange}
              />
              <div className="row justify-content-center">
                <input
                  className="col-6  btn btn-warning py-2 m-4"
                  type="submit"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="col-12">
          <div className="my-5">
            {this.state.definition[0].sound_urls.map(sound => (
              <audio className="p-1" controls>
                <source src={sound} />
              </audio>
            ))}
          </div>
          {this.state.definition.map(def => (
            <Definiton key={def.id} obj={def} />
          ))}
        </div>
      </div>
    );
  }
}
