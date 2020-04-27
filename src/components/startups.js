import React from "react";
import Axios from "axios";
import { ServerURI } from "../globals";

export default class Startups extends React.Component {
  state = {
    data: [],
    name: "",
    country: "",
    ack: "",
    showForm: false,
  };

  getData = () => {
    Axios.get(`${ServerURI}/api/getAllInfo`)
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, country, data } = this.state;

    if (name.trim().length === 0 && country.trim.length === 0) {
      alert("Please give valid inputs");
      this.setState({ ack: "" });
      return;
    }

    Axios.post(`${ServerURI}/api/addInfo`, {
      name: name.trim(),
      country: country.trim(),
    })
      .then((res) => {
        console.log(res);
        data.push(res.data.info);
        this.setState({
          name: "",
          country: "",
          ack: "Successfully added startup to the list",
          data: data,
          showForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ack: "Invalid input" });
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { data, name, country, ack, showForm } = this.state;

    return (
      <div
        style={{
          backgroundColor: "lightgrey",
          border: "1px solid black",
          margin: 20,
        }}
      >
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "purple",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>Welcome to Startup World</h1>
        </div>
        <div style={{ padding: 50 }}>
          <div>
            <h2>List of Startups</h2>
            <ol>
              {data.map((startup, index) => (
                <div key={index}>
                  <h4>
                    <li>
                      {startup.name}, {startup.country}
                    </li>
                  </h4>
                </div>
              ))}
            </ol>
          </div>
          <p
            style={{
              color: ack[0] === "S" ? "green" : "red",
            }}
          >
            {ack}
          </p>
          {showForm && (
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={country}
                  placeholder="Country"
                  onChange={(e) => this.setState({ country: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary btn-lg"
                  value="Add Startup"
                />
              </div>
            </form>
          )}
          {!showForm && (
            <input
              style={{ marginTop: 10 }}
              type="submit"
              className="btn btn-success btn-lg"
              value="Create New"
              onClick={() => this.setState({ showForm: true })}
            />
          )}
        </div>
      </div>
    );
  }
}
