import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../src/App';
import { MiloAssistant3D } from '../src/components/MiloAssistant3D';
import { DocuEaseLanding } from '../src/components/LandingPage/DocuEaseLanding';

try {
  console.log('Rendering MiloAssistant3D...');
  const miloHtml = ReactDOMServer.renderToString(React.createElement(MiloAssistant3D, { mood: 'idle' }));
  console.log('✓ MiloAssistant3D rendered. Length:', miloHtml.length);

  console.log('Rendering App...');
  const appHtml = ReactDOMServer.renderToString(React.createElement(App));
  console.log('✓ App rendered. Length:', appHtml.length);
  console.log('Contains DocuEase:', appHtml.includes('DocuEase'));
} catch (err) {
  console.error('Render test failed:', err);
  process.exit(1);
}
