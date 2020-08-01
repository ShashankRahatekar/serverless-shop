import React, { Component } from "react";
import "./Product.css";
import PayButton from "../PayButton";

class Product extends Component {

  constructor(props) {
    super(props);
    console.log('props in constr : ', props);
    this.state = {
      currentImage: 0,
      currentSku: props.skus ? props.skus[0] : ''
    };
  }

  render() {
    const { id, name, caption, images, description, skus } = this.props;
    var { currentImage, currentSku } = this.state;

    currentSku = currentSku ? currentSku : '';
    console.log('currentSku : ', currentSku);
    const thumbnails = images.map((image, index) => {
      return <img key={index} alt=''
        className={"product-thumbnail " + (index === currentImage
          ? 'selected' : '')}
        onClick={() => this.setState({ currentImage: index })}
        src={image} width="75" />
    });

    const skuList = skus && skus.map((sku, index) => {

      const { attributes } = sku;

      return (
        <div key={sku.id}
          className={"col-xs-2 product-sku " + (currentSku.id === sku.id
            ? 'selected' : '')}
          onClick={() => this.setState({ currentSku: sku })}>
          {attributes.size}
        </div>
      );
    });

    const price = (currentSku.price) + "";
    {/* <PayButton disabled={currentSku.inventory && currentSku.inventory.quantity < 1}
                       amount={price} sku={currentSku} name={name}
                       caption={caption}/> */}
    return (
      <div key={id} class="card ml-2" style={{ width: '14rem' }}>
        <div style={{ textAlign : 'center' }}>
          {thumbnails}
        </div>
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">{description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}
;

export default Product;