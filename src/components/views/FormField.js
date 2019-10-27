import React from 'react';

const FormFiled = (props) =>{

    let formElements = props.formElements
    let formArray = [];

     const renderFields = () =>{
        for (let formElement in formElements){
            formArray.push({
                id: formElement,
                formElementSettings: formElements[formElement]
            })
        }
        return(
            formArray.map((input,index)=>(
                <div key={index}  className='form-element'>
                    {renderTemplate(input)}
                </div>
            ))
        )
    }

    const showValidation = (data) =>{
        let errorMessage = null;
        if (data.validation && !data.valid){
            errorMessage = (
                <div className='error'>
                    {data.validationMessage}
                </div>
            )
        }
        return errorMessage
    }

    const showLabel = ( labelShow, labelText ) => {
        return ( labelShow ?
                    <label>{labelText}<span> *</span></label>
                :null
            )
    }

    const changeHandler = (e, id) =>{
        const newState = {...formElements};
        newState[id].value = e.target.value;

        let validData = validate(newState[id])
        // console.log(validData)
        newState[id].valid = validData[0]
        newState[id].validationMessage = validData[1]
        // console.log(newState)
        props.change(newState)
    }
    
    const validate = (elment) =>{
         let error = [true, '']

         if(elment.validation.required){
             const valid = elment.value.trim() !=='';
             const message =`${ !valid ? 'this field is required' : ''}`
            
             error = !valid ? [valid, message] : error
        }
        return error
    }

    const renderTemplate = (inputData) =>{
        let formElement = '';
        let elementSettings = inputData.formElementSettings;

        switch (elementSettings.elementType) {
            case('input'):
                formElement =  (  <div className='form-div'>
                                    <div>
                                        {showLabel(elementSettings.label, elementSettings.labelText)}
                                        <input
                                            {...elementSettings.attributes}
                                            value = {elementSettings.value}
                                            onChange = {e => {changeHandler(e, inputData.id)}}
                                        />
                                    </div>
                                        {showValidation(elementSettings)}
                                  </div>
                                )
            break;

            case ('textarea'):
                formElement =   (
                                    <div className='message'>
                                        {showLabel(elementSettings.label, elementSettings.labelText)}
                                        <textarea 
                                            {...elementSettings.attributes}
                                                value = {elementSettings.value}
                                                onChange = {e => {changeHandler(e, inputData.id)}}
    
                                        />
                                    </div>
                                )
            break;
            case ('select'): 
                    formElement = (
                                    <div className='select-age'>
                                        {showLabel(elementSettings.label, elementSettings.labelText)}
                                        <select value={elementSettings.value}
                                                onChange = {event => changeHandler(event, inputData.id)}
                                                name = {elementSettings.attributes.name}
                                        >
                                            {
                                                elementSettings.attributes.options.map((option,i) =>(
                                                    <option 
                                                        key = {i}
                                                        value = {option.val}
                                                    >
                                                        {option.optionText}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                            )

            break;
            default: formElement = null
}
        return formElement
    }

    return(
        <div>
            {renderFields()}
        </div>
    )
}
export default FormFiled;