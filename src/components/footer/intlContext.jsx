import React from 'react';
import messages from './messages';

const IntlContext = React.createContext({
  locale: 'en',
  messages: messages.en,
});

export default IntlContext;