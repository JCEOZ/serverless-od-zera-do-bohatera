import { Button, Container, Header, Icon, Image, List, Message } from 'semantic-ui-react'

import { API } from 'aws-amplify'
import React from 'react'
import axios from "axios";

const config = require('../../config.json');

export default function EditProducts() {
  const [products, setProducts] = React.useState([])
  const [infoLabel, setInfoLabel] = React.useState(null)
  const [reloadTrigger, setReloadTrigger] = React.useState(new Date())

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Starting getting data...');
        const response = await axios.get(`${config.api.productsUrl}`)
        const { metadata, data } = response.data
        console.log(`Fetched ${metadata.length} products`);
        setProducts(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts()
  }, [reloadTrigger])

  
  const renderItem = (product, index) => {
    const removeProduct = async () => {
      const productId = product.sk
      console.log(`remove product ${productId}`);
      try {
        const response = await API.del('products',`/products/${productId}`)
        if(response.error) {
          setInfoLabel({
            isError: true,
            header: 'Wystąpił błąd',
            text: response.error.message
          })  
        } else {
          console.log('product deleted');
          setReloadTrigger(new Date())
          setInfoLabel({
            isError: false,
            header: 'Product usunięto',
            text: ''
          })
        }
        
      } catch (error) {
        setInfoLabel({
          isError: true,
          header: 'Wystąpił błąd',
          text: error.message
        })
      }
    }
    return (
    <List.Item key={index}>
      <List.Content floated='right'>
        <Button onClick={removeProduct}>Remove</Button>
      </List.Content>
      <Image avatar src={product.imageUrl} />
    <List.Content>{product.name}</List.Content>
    </List.Item>)
  }

  return (
    <Container text style={{ marginTop: '7em' }}>
      <Container textAlign='center'>
        <Icon name='edit outline' size='large' />
        <Header as='h2' icon>
          Edytuj produkty
        </Header>
      </Container>
      {infoLabel && 
       <Message error={infoLabel.isError} header={infoLabel.header} content={infoLabel.text} />
      }
      <List divided verticalAlign='middle'>
        {products.map(renderItem)}
      </List>
    </Container>
  )
}