import React, {Component} from 'react';
import FormFiled from './views/FormField'

class NewMessage extends Component{

    state = {
        formElements:{    
            
            name:{
                elementType: 'input',
                value: '',
                label: true,
                labelText: 'Name',
                attributes:{
                    name: 'name-input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            lastName:{
                elementType: 'input',
                value: '',
                label: true,
                labelText: 'Last name',
                attributes:{
                    name: 'last-name-input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            age: {
                elementType: 'select',
                value: '1',
                label: true,
                labelText: 'Age',
                attributes:{
                    name: 'age-input',
                    options: [
                        {val :'1', optionText: '18-25'},
                        {val :'2', optionText: '25-35'},
                        {val :'3', optionText: '+35'}
                    ]
                }
            },
            message: {
                elementType: 'textarea',
                value: '',
                label: true,
                labelText: 'Message',
                attributes:{
                    name: 'message-input',
                    rows: 4,
                    cols: 36
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
            
        }
    }



    onSubmit =(e)=>{
        e.preventDefault()
        let dataToSend = {};
        for (let key in this.state.formElements){
            dataToSend[key] = this.state.formElements[key].value
        }

        // console.log(dataToSend)
        this.onReset()
    }

    onReset =()=>{
        
        for (let key in this.state.formElements){
            let {formElements} = {...this.state}
            formElements[key].value =''

            this.setState({
                formElements:formElements
            })
        }
    }
    
    updateState = (newState) =>{
        this.setState({
            formElements:newState
        })
    }
    
    render(){
        return(
            <div className='new-message-form'>
                <form onSubmit={this.onSubmit}>
                    
                    <FormFiled 
                        formElements={this.state.formElements}
                        change={(newState)=> this.updateState(newState)}
                    />

                    <div className='buttons'>
                        <button type='submit'>Send</button>
                        <button type='reset' onClick={this.onReset}>Reset</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default NewMessage;


