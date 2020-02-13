import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxily/Auxily';


const withErrorHandler = (WrapperComponent,axios) =>{
    return class WithErrorHandler extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                error:null
            }
        }

        componentWillMount(){
            axios.interceptors.request.use( req => {
                this.setState({error:null})
                return req ;
            })

            axios.interceptors.response.use( res => res, err => {
                this.setState({error:err})
            })
        }

        errorConfirmHandler = () =>{
            this.setState({error:null})
        }
        render(){
            return (
                <Aux>
                    <Modal 
                    show = {this.state.error}
                    click = {this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                    
                </Aux>
    
            )
        }
        
    }
}


export default withErrorHandler;