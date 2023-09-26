import { useState } from "react";

const useInputData = (initialValue) => {
    const [inputValue , setInputValue] = useState(initialValue);

    function handleOnChange(e){
        setInputValue(e.target.value);
    }

    function clearInput(){
        setInputValue("")
    }

    const inputProps = {
        value : inputValue,
        onChange : handleOnChange
    }

    return [inputProps , clearInput];
}

export default useInputData;