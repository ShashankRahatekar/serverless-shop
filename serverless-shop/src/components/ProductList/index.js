import React, {Component} from "react";
import config from "../../config";

import Product from "../Product";

import "./ProductList.css";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() { // Token returned from Stripe
    const res = await fetch(config.stripe.productsUrl, { // Backend API url
      method: 'GET'
    });
    const response = await res.json();
    const products = response.data;
    console.log( 'response : ', response );

    // this.setState({
    //   products
    // });
    this.fetchSKUs(products);
  }

  async fetchSKUs(products) { // Token returned from stripe
    const res = await fetch(config.stripe.skusUrl, { // SKUs API url
      method : 'GET'
    });
    const response = await res.json();
    const skus = response.data;

    // const products = this.state.products;
    products.filter(product => {
      product.skus = [];
      skus.map( sku => {
        if( sku.product === product.id ){
          product.skus.push(sku);
        }
      })
    })
    console.log( 'products : ', products )
    this.setState({ products });
  }

  render() {
    const {products} = this.state;

    const productList = products.map((product, index) => {
      return (
          <Product id={product.id}
                   name={product.name}
                   caption={product.caption}
                   description={product.description}
                   skus={product.skus}
                   images={product.images} />
      );
    });

    return (
        <div id="products" className='row'>
          {productList}
        </div>
    );
  }
}

export default ProductList;
