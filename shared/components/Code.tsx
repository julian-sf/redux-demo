import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as materialOceanic from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic';

export const Code = ({ code }) => {
  return (
    <SyntaxHighlighter language={'typescript'} style={materialOceanic}>
      {code}
    </SyntaxHighlighter>
  );
};
