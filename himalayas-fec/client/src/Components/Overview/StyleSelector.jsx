import React, { useState, useEffect } from 'react';
import StyleGallery from './StyleGallery.jsx';
import { stylesResponse } from '../../lib/Atoms.jsx';
import { productStyles } from '../../lib/searchAPI.js';
import { selectedProduct } from './Overview.jsx';
import {productQ} from '../../App.jsx';
import {productResponse, selectedProductId} from '../../lib/Atoms.jsx';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


const StyleSelector = (props) => {

  if (props.styles) {

    var styles = props.styles.results;

    const [currentStyle, setStyle] = useState(styles[0])


    useEffect(() => {

      setStyle(props.styles.results[0])

    }, [props.styles]);


    const photos = styles.map(style => {
      return style.photos;
    });

    const thumbnails = styles.map(style => {
      return {
        styleId: style.style_id,
        name: style.name,
        thumbnail: style.photos[0].thumbnail_url};
    });

    const getStyleById = (id) => {
      const filteredStyle = styles.filter(style => style.style_id === id);

      return filteredStyle[0];
    };

    const placeHolder = (url) => {
      var imgPath = url;
      if (!url) {
        imgPath ="https://ouikar.com/pub/media/catalog/product/placeholder/default/image_not_available.png";
      }
      return imgPath;
    }

    return (

      <div className="styles">
      <h3>Styles</h3>
        <div id="imageContainer">
          {thumbnails.map((thumbnail, index) => (
            <div key={index}>
              <p className="styleName">{thumbnail.name}</p>
              <img className="styleThumb"
              src={placeHolder(thumbnail.thumbnail)} width="75" height="90"
              onClick={event => setStyle(currentStyle => getStyleById(thumbnail.styleId))}
              ></img>
            </div>
          ))}
        </div>
      <StyleGallery  style={currentStyle}/>
    </div>
  )

  } else {

    return (
      <div id="styles">
        <h3>Styles</h3>
        <h4><i>No Alternate Styles Available</i></h4>
        <div id="imageContainer">
          <img className="no-image" src="https://ouikar.com/pub/media/catalog/product/placeholder/default/image_not_available.png"
            height="300px" width="300px"></img>
        </div>
      </div>
    )
  }
};



export default StyleSelector;