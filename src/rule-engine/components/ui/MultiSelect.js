import { useState } from "react";
import AsyncSelect from "react-select/async";
import Select, { components } from "react-select";
import MultiSelectOptionLabel from "./MultiSelectOptionLabel";
import { doAjaxDummy as doAjax } from "../../../utility";

function MultiValueLabel(props) {
  return (
    <components.MultiValueLabel {...props}>
      <MultiSelectOptionLabel str={props.children} />
    </components.MultiValueLabel>
  );
}

const Option = (props) => {
  return (
    <components.Option {...props}>
      <MultiSelectOptionLabel str={props.children} />
    </components.Option>
  );
};

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
          ...props.ajax,
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
  if (props.static) {
    return (
      <Select
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        isMulti={props.isMulti}
        isClearable
        placeholder={props.placeholder}
        className="static-select"
      />
    );
  }
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
      components={{ MultiValueLabel, Option }}
    />
  );
}
