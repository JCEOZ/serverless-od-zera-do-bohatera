import { Button, Comment, Container, Form, Header, Icon, Item } from 'semantic-ui-react'

import React from 'react'
import axios from "axios";

import { API } from 'aws-amplify'

import { Context } from "../Store";
const config = require('../config.json');

export default function Product(props) {
  const [product, setProduct] = React.useState([])
  const [comments, setComments] = React.useState([])
  const [formValue, setFormValue] = React.useState('')
  const [reloadTrigger, setReloadTrigger] = React.useState(new Date())
  const { store } = React.useContext(Context);

  const productId = props.match.params.id
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Starting getting data...');
        const { data } = await axios.get(`${config.api.productsUrl}/${productId}`)
        console.log('Fetched product');
        setProduct(data)
      } catch (error) {
        console.log(error);
      }
    }
    const fetchComments = async () => {
      try {
        console.log('Starting getting comments...');
        const { metadata, data } = await API.get('products', `/products/${productId}/comments`) // axios.get(`${config.api.productsUrl}/${productId}/comments`)
        console.log(`Fetched ${metadata.length} comments`);
        setComments(data)
        setFormValue('')
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct()
    fetchComments()
  }, [reloadTrigger])

  const productItem = {
    childKey: 0,
    image: product.imageUrl,
    header: `Produkt: ${product.name}`,
    description: product.description,
    meta: `Kategoria: ${product.category}`,
    extra: `id: ${productId}`,
  }


  const handleChange = (e, { name, value }) => {
    setFormValue(value)
  }

  const handleSubmit = async () => {
    console.log('Submitting comment');
    if (formValue) {
      const label = store.user ? `${store.user.firstname} ${store.user.lastname}` : 'no user'
      const params = {
        text: formValue,
        username: 'user-id',
        userlabel: label
      }
      try {
        await API.post('products', `/products/${productId}`, {
          body: params
        })
        setReloadTrigger(new Date())
      } catch (error) {
        console.log(error)
      }
    }
  }

  const renderComment = (comment, index) => {
    const digit = () => comment.sk.slice(-2,-1)
    return (<Comment key={index}>
      {/* <Comment.Avatar src={`https://api.adorable.io/avatars/120/${comment.sk}.png`} /> */}
      <Comment.Avatar src={`https://randomuser.me/api/portraits/lego/${digit()}.jpg`} />
      <Comment.Content>
        <Comment.Author as='a'>{comment.userlabel}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.sk}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
      </Comment.Content>
    </Comment>)
  }

  return (
    <Container text style={{ marginTop: '7em' }}>
      <Item.Group items={[productItem]} />
      <Comment.Group>
        <Header as='h3' dividing>Komentarze ({comments.length})</Header>
        {comments.map(renderComment)}
        <Form reply>
          <Form.TextArea onChange={handleChange} value={formValue}/>
          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleSubmit} />
        </Form>
      </Comment.Group>
    </Container>
  )
}