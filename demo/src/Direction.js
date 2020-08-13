import React, { useState } from 'react';
import Helmet from 'react-helmet';

export default () => {
  const [direction, setDirection] = useState('ltr');

  return (
    <>
      <Helmet>
        <html lang="en" dir={direction} />
      </Helmet>
      <button
        type="button"
        id="dir-selector"
        onClick={() => setDirection((value) => (value === 'ltr' ? 'rtl' : 'ltr'))}
      >
        {direction}
      </button>
    </>
  );
};
