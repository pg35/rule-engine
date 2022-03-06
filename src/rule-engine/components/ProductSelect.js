import { useState, useEffect } from "react";

import AsyncSelect from 'react-select/async'
import {ajaxUrl,
  doAjax,
  doAjaxDummy,getProductOptions} from '../../utility'
  
  

export default function ProductSelect(props) {
  const [loading, setLoading] = useState(false);
  const ids = [1,2,3,4]
    
  const filterProducts = searchString => 
  {
    const s = searchString.toLowerCase()
    return getProductOptions(ids).filter(obj=>obj.label.toLowerCase().includes(s))
  }
const loadOptions = (inputValue, callback) => {
  console.log('loadotions ' + (inputValue ?inputValue: 'emtpy' ))
  setLoading(true);
  doAjaxDummy(ajaxUrl, {}).then((data) => {
    callback(filterProducts(inputValue));  
    setLoading(false);
  });
};
  console.log(props)
  return (
    <AsyncSelect
      value={getProductOptions(props.value)}
      onChange={props.onChange}
      isMulti
      isClearable
      loadingMessage={() => "Searching products"}    
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => "No product found"}
      placeholder="Search product &hellip;"
      className="product-select"

    />
  );
}
