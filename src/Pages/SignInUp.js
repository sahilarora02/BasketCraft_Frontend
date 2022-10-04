import React from 'react'
import ReactCardFlip from 'react-card-flip';




  const  handleClick= (e)=> {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
export default function SignInUp() {



    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
    {/* <YOUR_FRONT_CCOMPONENT> */}
      This is the front of the card.
      <button onClick={this.handleClick}>Click to flip</button>
    {/* </YOUR_FRONT_CCOMPONENT> */}

    {/* <YOUR_BACK_COMPONENT> */}
      This is the back of the card.
      <button onClick={this.handleClick}>Click to flip</button>
    {/* </YOUR_BACK_COMPONENT> */}
  </ReactCardFlip>

   
  
}
