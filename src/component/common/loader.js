import React, { Component } from "react";
import { Container, Spinner } from "reactstrap";
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="loader">
        <Container fluid="lg">
          <div className="loader-data">
            <Spinner>Loading...</Spinner>
          </div>
        </Container>
      </section>
    );
  }
}

export default Loader;
