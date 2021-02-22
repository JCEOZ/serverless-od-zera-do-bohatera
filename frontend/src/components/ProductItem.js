import React from 'react'
import { Context } from "../Store";
import history from '../history'
import {
  Card
} from 'semantic-ui-react'

export default function ProductItem(props) {
  const { store } = React.useContext(Context);
  const handleClick = () => {
    if (store.isAuthenticated) {
      console.log('redirection to product page');
      history.push(`/product/${props.item.sk}`)
    }
  }
  return (
    <Card onClick={handleClick}
      image={props.item.imageUrl}
      header={props.item.name}
      meta={props.item.category}
      description={props.item.description}
    />
  )
}