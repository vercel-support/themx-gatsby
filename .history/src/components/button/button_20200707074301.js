import React from 'react';
import 'button.scss';

const Button = (children) => (
  <Button>
    <button className='button'>{children}</button>
  </Button>
);

export default Button;
