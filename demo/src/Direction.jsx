import React, { useState, useEffect } from 'react';

export default () => {
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <>
      <button
        type="button"
        id="dir-selector"
        onClick={() =>
          setDirection((value) => (value === 'ltr' ? 'rtl' : 'ltr'))
        }
      >
        {direction}
      </button>
    </>
  );
};
