import { useState } from "react";
import AsyncSelect from "react-select/async";
import { doAjaxDummy as doAjax } from "../../../utility";

export default function MultiSelect(props) {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [keyId, setKeyId] = useState(props.keyId);
  if (keyId !== props.keyId) {
    setKeyId(props.keyId);
    setDefaultOptions([]);
  }

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) {
      callback([]);
    } else {
      doAjax(
        {
          action: props.action,
          security: props.security,
          term: inputValue.toLowerCase()
        },
        { isOwnAction: false }
      ).then((response) => {
        const options = props.buildOptions(response.data);
        setDefaultOptions(options);
        callback(options);
      });
    }
  };
  //cacheOptions
  return (
    <AsyncSelect
      value={props.value}
      onChange={props.onChange}
      isMulti
      isClearable
      defaultOptions={defaultOptions}
      loadingMessage={() => `Searching ${props.labels.plural}...`}
      loadOptions={loadOptions}
      noOptionsMessage={() => `No ${props.labels.single} found`}
      placeholder={`Type at least 3 charaters to search ${props.labels.plural}...`}
      className="product-select"
    />
  );
}
