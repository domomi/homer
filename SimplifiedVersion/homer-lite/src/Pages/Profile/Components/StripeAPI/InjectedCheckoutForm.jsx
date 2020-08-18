import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
// import './InjectedCheckoutForm.css'

const styles = {
  CardElement : {
    display: 'block',
    // border: 'none',
    fontSize: '25pt',
    margin: '10px 0 20px 0',
    maxWidth: '100%',
    padding: '10px 14px',
    boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    borderRadius: '4px',
    background: 'white',
    color : '#424770',
    letterSpacing :' 0.025em',
    width : '500px',
    marginBottom : '10vh',
    height : '15vh'
  },
  PayBtn : {
    whiteSpace: 'nowrap',
    border: '0',
    outline: 0,
    display: 'inline-block',
    height: '40px',
    lineHeight: '40px',
    padding: '0 14px',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    backgroundColor: '#6772e5',
    textDecoration: 'none',
    webkitTransition: 'all 150ms ease',
    transition : 'all 150ms ease',
    marginTop : '5vh',
  }
}

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };


  render() {
    const {stripe} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div 
        // style={styles.CardElement}
        >
          <CardElement />
        </div>
        
        
        <button 
        // style={styles.PayBtn}
         type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

export default InjectedCheckoutForm