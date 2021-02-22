import { Button, Container, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import React, { Component } from 'react';

import { API } from 'aws-amplify'
import axios from 'axios';

const config = require('../../config.json');

class ImportFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    }
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "" });

  }

  getSignedUrl = async (filename) => {
    const params = {
      queryStringParameters: {
        filename
      }
    }
    try {
      const { signedUrl } = await API.get('signedUrl', '/signedUrl', params)
      console.log("Received a signed URL from backend " + signedUrl);
      return signedUrl
    } catch (error) {
      console.log(JSON.stringify(error));
      this.setState({
        error: true,
        message: error.message
      })
      return null
    }
  }

  uploadFile = async (file, fileType, signedUrl) => {
    if (signedUrl) {
      const options = {
        headers: {
          'content-Type': fileType,
        }
      }
      axios.put(signedUrl, file, options)
        .then(result => {
          console.log("Upload complete")
          this.setState({ success: true });
        })
        .catch(error => {
          console.log("ERROR " + error.message);
          console.log(JSON.stringify(error));
          this.setState({
            error: true,
            message: error.message
          })
        })

    }
  }

  handleUpload = async (ev) => {
    let file = this.uploadInput.files[0];
    let [filename, fileType] = file.name.split('.');
    console.log("Preparing the upload");

    const signedUrl = await this.getSignedUrl(file.name)
    this.uploadFile(file, fileType, signedUrl)
  }

  render() {
    return (
      <Container text style={{ marginTop: '15em' }}>
        <Container textAlign='center'>
          <Icon name='cloud upload' size='large' />
          <Header as='h2' icon>
            Importuj plik
        </Header>
        </Container>
        <Container textAlign='center'>
          {this.state.success &&
            <Message success header='Sukces. Plik wgrany.' />
          }
          {this.state.error &&
            <Message error header='Wystąpił błąd' content={this.state.message} />
          }
          <Grid columns='two'>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={this.handleUpload} icon='cloud upload' label='Importuj' size='big' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    );
  }
}
export default ImportFile;