import AsyncSelect from "react-select/async";
import { doAjaxDummy as doAjax } from "../../utility";

export default function ProductSelect(props) {
  const allOptions = [
    { value: 1, label: "imran" },
    { value: 2, label: "kkk" },
    { value: 3, label: "ali" },
    { value: 4, label: "bbbb" }
  ];

  const filterProducts = (searchString) => {
    const s = searchString.toLowerCase();
    return allOptions.filter((obj) => obj.label.toLowerCase().includes(s));
  };
  const loadOptions = (inputValue, callback) => {
    //console.log("loadotions " + (inputValue ? inputValue : "emtpy"));
    doAjax({}).then((response) => {
      callback(filterProducts(inputValue));
    });
  };
  //console.log(props);
  return (
    <AsyncSelect
      value={props.value}
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
