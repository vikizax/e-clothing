import React from 'react';

import { GroupContainer, FormInputField, FormInputLabel } from './form-input.style';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <GroupContainer className='group'>
    <FormInputField onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabel
        className={otherProps.value.length ? 'shrink' : ''}
      >
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
