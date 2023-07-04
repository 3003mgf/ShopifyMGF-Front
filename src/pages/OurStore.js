import React, {useContext, useEffect, useState} from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import ReactStars from "react-rating-stars-component";
import ProductTemplate from '../utils/ftProductsTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsFiltered, getAllProductsForRandom, getBrands, getCategories, getColors, getSizes, getWishlist } from '../features/products/productsSlice';
import RandomProduct from '../utils/randomProduct';
import { ViewProduct } from '../utils/viewProduct';
import { VPContext } from '../context/viewProductContext';
import { ScrollToTop } from '../components/ScrollTop';

const OurStore = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { productsRandom, productsFiltered, brands, colors, categories, sizes } = state.products;
 


  // FILTER STATES
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [tag, setTag] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [quantity, setQuantity] = useState(true);
  const [sort, setSort] = useState(null);

  useEffect(() => {
      dispatch(getAllProductsFiltered({sort, brand, color, minPrice, maxPrice, category, quantity, size}));
      dispatch(getWishlist());
      dispatch(getBrands());
      dispatch(getCategories());
      dispatch(getColors());
      dispatch(getSizes());
      window.scroll(0, 0);
  },[sort, brand, color, category, quantity, size]);

  useEffect(() => {
    dispatch(getAllProductsForRandom());
  }, []);
  
  const handleMinMaxPrice = () =>{
    dispatch(getAllProductsFiltered({sort, brand, color, minPrice, maxPrice, category, quantity}));
  };

  const handleBroomPrice = () =>{
    dispatch(getAllProductsFiltered({sort, brand, color, category, quantity}));
    setMinPrice("");
    setMaxPrice("");
  };

  const ratingChanged = (newRating) =>{
    console.log(newRating);
  }

  const handleSizeFilter = (e) =>{
    if(e.target.checked){
      console.log("Checked");
    }else{
      console.log("Not Checked");
    }
  };

  const [grid, setGrid] = useState(4);

  const gridSetter = (newGrid) =>{
    setGrid(newGrid);
  }
  const data = useContext(VPContext);
  const { viewProductIsOpen, viewProductData } = data;

  
  return ( 
    <div>
      <HelmetMeta title="Our Store  "/>
      <Breadcrumb title="Our Store"/>
      {viewProductIsOpen && viewProductData && <ViewProduct/>}
      <div className="store-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              {/* FIRST DIV */}
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className='ps-0'>
                    {categories.length && categories.map((el, index) => <li key={index} onClick={()=>{if(category !== el.title){setCategory(el.title)}else{setCategory(null)}}} style={{color: category && category === el.title ? "#000000" : "#777777", fontWeight: category && category === el.title ? "500" : "normal"}}>{el.title}</li> )}
                  </ul>
                </div>
              </div>

              {/* BRANDS */}
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Brands In Stock</h3>
                <div>
                  <ul className='ps-0'>
                    {brands.length && brands.map((el, index) => <li style={{color: brand && brand === el.title ? "#000000" : "#777777", fontWeight: brand && brand === el.title ? "500" : "normal"}} key={index} onClick={()=>{if(brand !== el.title){setBrand(el.title)}else{setBrand(null)}}}>{el.title}</li> )}
                  </ul>
                </div>
              </div>

              {/* SECOND DIV */}
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Filter By</h3>
                <div>
                  {/* AVAILABILITY */}
                  <h5 className="sub-title mb-1 mt-4">Availability</h5>
                  <div className="form-check d-flex align-items-center">
                    <input type="checkbox" id='store-form-check' checked={quantity ? true : false} className='form-check-input' onClick={()=> setQuantity(true)}/>
                    <label htmlFor="store-form-check" className='form-check-label ms-1 mt-1'>In stock</label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input type="checkbox" id='out-of-stock' checked={quantity ? false : true} className='form-check-input' onClick={()=> setQuantity(false)} />
                    <label htmlFor="out-of-stock" className='form-check-label ms-1 mt-1 mb-1'>Out of Stock</label>
                  </div>

                  {/* PRICES */}
                  <h5 className="sub-title">Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating mb-1">
                      <input type="number" id='floating-input' className='form-control prices-input' onChange={(e)=> setMinPrice(e.target.value)} value={minPrice} />
                      <label htmlFor="floating-input">From</label>
                    </div>
                    <div className="form-floating mb-1">
                      <input type="number" id='floating-input' className='form-control prices-input' onChange={(e)=> setMaxPrice(e.target.value)} value={maxPrice} />
                      <label htmlFor="floating-input">To</label>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end gap-20 px-3 py-3'>
                    <i class="fa-solid fa-broom fa-xl" title="Use Broom" onClick={handleBroomPrice}></i>
                    <i className="fa-solid fa-magnifying-glass-dollar fa-xl" title="Search" onClick={handleMinMaxPrice}></i>
                  </div>

                  {/* COLORS */}
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <div className="d-flex flex-wrap">
                      <ul className="colors ps-0">
                        {colors.length && colors.map((el, index) => <li key={index} id={el.title} title={el.title} onClick={()=>{if(color !== el.title){setColor(el.title)}else{setColor(null)}}} style={{backgroundColor: el.title, boxShadow: "0 0 1rem lightgrey", scale: color && color === el.title ? "1.3" : "1"}}></li>)}
                      </ul>
                    </div>
                  </div>

                  {/* SIZE */}
                  <h5 className="sub-title mb-1">Sizes</h5>
                  <div>
                    <div className="form-check d-flex align-items-center">
                      <input type="checkbox" id='store-form-check' checked={size == null ? true : false} className='form-check-input' onChange={handleSizeFilter} onClick={()=> setSize(null)}/>
                      <label htmlFor="store-form-check" className='form-check-label ms-1 mt-1'>All Sizes</label>
                    </div>
                    {sizes.length && sizes.map((el, index) => {
                      return (
                        <div key={index} className="form-check d-flex align-items-center">
                          <input type="checkbox" id='store-form-check' checked={size === el.title ? true : false} className='form-check-input' onChange={handleSizeFilter} onClick={()=> setSize(el.title)}/>
                          <label htmlFor="store-form-check" className='form-check-label ms-1 mt-1'>{el.title}</label>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </div>

              {/* THIRD DIV */}
              {/* <div className='filter-card mb-3'>
                <h3 className="filter-title">Product Tags</h3>
                <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-15 mb-2">
                      {tags.length && tags.map((el, index) => {
                        return (
                          <span key={index} className="badge bg-light rounded-3 py-2 px-3" onClick={()=> setTag(el)}>
                            {el}
                          </span>
                        )
                      })}
                    </div>
                  </div>
              </div> */}

              {/* FOURTH DIV */}
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Random Product</h3>
                  {productsRandom.length && (()=>{
                    let randomNumber = Math.floor(Math.random() * (productsRandom.length - 2));
                    return (
                      <div>
                        <RandomProduct
                          id={productsRandom[randomNumber]._id}
                          img={productsRandom[randomNumber].images[0].url}
                          img2={productsRandom[randomNumber].images[1].url}
                          brand={productsRandom[randomNumber].brand}
                          title={productsRandom[randomNumber].title}
                          price={productsRandom[randomNumber].price}
                          rate={productsRandom[randomNumber].totalRating}
                        />
                        <RandomProduct
                          id={productsRandom[randomNumber + 1]._id}
                          img={productsRandom[randomNumber + 1].images[0].url}
                          img2={productsRandom[randomNumber + 1].images[1].url}
                          brand={productsRandom[randomNumber + 1].brand}
                          title={productsRandom[randomNumber + 1].title}
                          price={productsRandom[randomNumber + 1].price}
                          rate={productsRandom[randomNumber + 1].totalRating}
                        />
                      </div>
                    )
                  })()}
              </div>

            </div> {/* Below Ends the COL-3 */}

          {/* DROP DOWN BAR */}
          <div className="col-9">
            <div className="filter-sort-grid mb-4">

              {/* NAVBAR (LEFT SIDE) */}
             <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block sort-p">Sort By:</p>
                  <select name="sort_by" id="sortby" className="form-select form-control" onChange={(e)=> setSort(e.target.value)}>
                    <option value="-createdAt">
                      Default
                    </option>
                    <option value="title">
                      Alphabetically, A-Z
                    </option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">
                      Price, low to high
                    </option>
                    <option value="-price">
                      Price, high to low
                    </option>
                    <option value="createdAt">
                      Date, old to new
                    </option>
                    <option value="-createdAt">
                      Date, new to old
                    </option>
                  </select>
              </div>

              {/* RIGHT SIDE */}
              <div className="d-flex align-items-center gap-10">
                <p className='totalproducts mb-0'>{productsFiltered.length} Products</p>
                <div className="d-flex gap-10 align-items-center">
                  <img src="images/gr4.svg" className='d-block img-fluid' alt="grid" onClick={()=>gridSetter(3)} />
                  <img src="images/gr3.svg" className='d-block img-fluid' alt="grid" onClick={()=>gridSetter(4)} />
                  <img src="images/gr2.svg" className='d-block img-fluid' alt="grid" onClick={()=>gridSetter(6)} />
                  <img src="images/gr.svg" className='d-block img-fluid' alt="grid" onClick={()=>gridSetter(12)} />
                </div>
              </div>
              
             </div>
            </div>

            {/* PRODUCT LIST */}
            <div className="products-list pb-5">
                {productsFiltered.length ? 
                  <div className="d-flex flex-wrap gap-10">
                    {productsFiltered.map((el, index) => <ProductTemplate key={index} grid={grid} img={el.images[0].url} img2={el.images[1].url} img3={el.images[2].url} color={el.color} size={el.size} title={el.title} brand={el.brand} price={el.price} rate={el.totalRating} prodId={el._id} tags={el.tags} />)}
                  </div>    
                  :
                  <div className='dummy-store-div d-flex flex-column justifiy-content-center align-items-center'>
                    <div className='dummy-store-div-img'>
                      <img src="images/dummy-robot.svg" alt="dummy" className='img-fluid'/>
                    </div>
                    <p>Mmm... I don't think we have any product with those characteristics.</p>
                  </div>  
                }
            </div>

           </div> {/*END OF COL-9*/}
          </div> {/*END OF .ROW*/}
        </div>
      </div>
    </div>
   );
}
 
export default OurStore;