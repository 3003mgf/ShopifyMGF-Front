import React from 'react';

const ColorsSetter = ({bigger, colors, color, setColor}) => {
  return ( 
    <div>
      <div className="d-flex flex-wrap">
        <ul className={`${bigger && "bigger"} colors ps-0`}>
          {colors.map((el, index) => 
            <li 
              // id={`${el._id}`} 
              key={index}
              title={`${el}`} 
              style={{backgroundColor: `${el}`, boxShadow: "0 0 1rem lightgrey", scale: color === el && "0.9", border: color === el && "0.2rem double #777777"}}
              onClick={()=> {color === el ? setColor(null) : setColor(el)}}
              >
            </li>
          )}
        </ul>
       </div>
    </div>
   );
}
 
export default ColorsSetter;