import AsyncSelect from "react-select/async";
import { doAjaxDummy as doAjax } from "../../../utility";

export default function MultiSelect(props) {
  console.log(props);
  const loadOptions = (inputValue, callback) => {
    doAjax({ action: props.action, term: inputValue.toLowerCase() }).then(
      (response) => {
        console.log(response);
        callback(props.buildOptions(response));
      }
    );
  };

  return (
    <AsyncSelect
      value={props.value}
      onChange={props.onChange}
      isMulti
      isClearable
      loadingMessage={() => `Searching ${props.labels.plural}...`}
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => `No ${props.labels.single} found`}
      placeholder={`Search ${props.labels.single}...`}
      className="product-select"
    />
  );
}
