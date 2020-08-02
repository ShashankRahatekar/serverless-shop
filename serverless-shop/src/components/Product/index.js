import React, { Component } from "react";
import "./Product.css";
import PayButton from "../PayButton";
import config from "../../config";

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      currentSku: props.skus ? props.skus[0] : ''
    };
  }

  componentDidMount(){
    const self = this;
    this.handler = window.StripeCheckout.configure({
      key: config.stripe.apiKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function (token) {
        self.onToken(token);
      }
    });
  }
  
  async onToken(token) { // Token returned from Stripe

    const sku = this.props.skus[0];
    // const {firstName, lastName, street, streetNumber, zipcode, city} = this.state;

    const res = await fetch(config.stripe.checkoutUrl, { // Backend API url
      method: 'POST',
      body: JSON.stringify({
        token,
        order: {
          currency: config.stripe.currency,
          items: [
            {
              type: 'sku',
              parent: sku.id
            }
          ],
          shipping: {
            name: 'Shashank Rahatekar',
            address: {
              line1: 'Chhindwara',
              city: 'Chhindwara',
              postal_code: '480001'
            }
          }
        }
      }),
    });
    const data = await res.json();
    console.log('onToken'); // Logs for ease of debugging
    console.log(data);

    this.setState({
      alreadyOrdered: true
    });
  }

  openStripe(ev, skus) {
    console.log( skus );  
    ev.preventDefault();

    const {price, product} = skus[0];

    console.log( price, product );

    this.handler.open({
      name: "Serverless Shop",
      description: 'caption',
      zipCode: true,
      currency: 'inr',
      amount: price,
      closed: () => {
        console.log("popup closed");
      }
    });

  }

  render() {
    const { id, name, caption, images, description, skus } = this.props;
    var { currentImage, currentSku } = this.state;

    currentSku = currentSku ? currentSku : '';
    console.log('caption : ', caption);
    const thumbnails = images.map((image, index) => {
      return <img key={index} alt=''
        className={"product-thumbnail " + (index === currentImage
          ? 'selected' : '')}
        onClick={() => this.setState({ currentImage: index })}
        src={image} style={{ width : '75px', height : '75px', marginTop : '12px' }} />
    });
    return (
      <div key={id} class="card ml-2" style={{ width: '14rem' }}>
        <div style={{ textAlign : 'center' }}>
          {thumbnails}
        </div>
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">{description}</p>
          <p class="card-text"> INR {skus[0] ? skus[0].price : 0} </p>
          <a href="/#" class="btn btn-primary" onClick={ (ev) => this.openStripe(ev, skus) }>Buy Now</a>
        </div>
      </div>
    );
  }
}
;

export default Product;