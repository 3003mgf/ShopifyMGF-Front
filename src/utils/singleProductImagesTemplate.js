import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../features/products/productsSlice";

const SingleProductTemplateImages = () => {
 
  const {id} = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { product } = state.products;

  const [imgZoomIndex, setImgZoomIndex] = useState(0);
  const [imgZoomIndex2, setImgZoomIndex2] = useState(1);
  const [imgZoomIndex3, setImgZoomIndex3] = useState(2);

 
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  
  const imageZoomProps = {
    width: 700,
    height: 500,
    zoomWidth: 500,
    img: product && product.images[imgZoomIndex].url
  };

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="main-product-image">
        <div>
          {product && <ReactImageZoom {...imageZoomProps}/>}
        </div>
      </div>
      {/* SECONDARY IMAGES */}
      <div className="secondary-images d-flex flex-wrap gap-15">
        <div className="p-3">
          <img src={product && product.images[imgZoomIndex2].url} id="img1"  alt="" className="img-fluid" onClick={()=> {let index = imgZoomIndex2; setImgZoomIndex2(imgZoomIndex) ; setImgZoomIndex(index)}} />
        </div>
        <div className="p-3">
          <img src={product && product.images[imgZoomIndex3].url} id="img2" alt="" className="img-fluid" onClick={()=> {let index = imgZoomIndex3; setImgZoomIndex3(imgZoomIndex) ; setImgZoomIndex(index)}} />
        </div>
        
      </div>
      {/*End of Secondary Images*/}
    </div>
  );
};

export default SingleProductTemplateImages;
