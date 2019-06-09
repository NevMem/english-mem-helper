import React, { Component } from "react";
import {
  Button,
  Container,
  Grid,
  Segment,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";

class MainPage extends Component {
  constructor(prps) {
    super(prps);
    this.state = {
      data: [],
      loading: true,
      index: -1,
      mode: "ru",
      open: false
    };
  }

  nextQuestion() {
    let nextIndex = (Math.random() * this.state.data.length) | 0;
    this.setState({ index: nextIndex, mode: "ru" });
  }

  componentDidMount() {
    axios
      .get("/sample.json")
      .then(data => data.data)
      .then(data => {
        this.setState(
          {
            loading: false,
            data: data
          },
          () => this.nextQuestion()
        );
      });
  }

  swap() {
    let nextMode = "ru";
    if (this.state.mode === "ru") nextMode = "en";
    this.setState({ mode: nextMode });
  }

  close() {
    this.setState({ open: false });
  }

  example() {
    this.setState({ open: true });
  }

  render() {
    let show = null;
    let example = "No examples";
    if (this.state.index !== -1) {
      show = (
        <p style={{ marginTop: "calc(50vh - 100px)" }}>
          {this.state.data[this.state.index][this.state.mode]}
        </p>
      );
      if (this.state.data[this.state.index].ex)
        example = this.state.data[this.state.index].ex;
    }
    return (
      <Container style={{ height: "100%" }}>
        <Modal basic open={this.state.open} onClose={this.close.bind(this)}>
          <Header as='h2' icon="browser" content="Examples" />
          <Modal.Content><p style={{fontSize: '20px'}}>{example}</p></Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.close.bind(this)} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <Grid style={{ height: "100%" }}>
          <Grid.Row style={{ height: "calc(100% - 80px)" }}>
            <Grid.Column style={{ height: "calc(100%)" }}>
              <Segment
                textAlign="center"
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  height: "calc(100%)"
                }}
                inverted
              >
                {show}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Button
                onClick={this.swap.bind(this)}
                size="huge"
                color="violet"
                inverted
                content="Swap"
              />
            </Grid.Column>
            <Grid.Column width={8} textAlign="center">
              <Button
                onClick={this.example.bind(this)}
                size="huge"
                color="red"
                inverted
                content="Example"
              />
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Button
                onClick={this.nextQuestion.bind(this)}
                inverted
                size="huge"
                color="yellow"
                content="Next"
                floated="right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default MainPage;
