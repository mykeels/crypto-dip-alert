import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: ({ target: { type, _value } }) => {
        const val = type === 'number' ? parseFloat(_value || 0, 10) : _value;
        setValue(val);
      },
    },
  };
};
