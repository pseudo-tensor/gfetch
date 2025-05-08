import React from 'react';
import ReactDOM from 'react-dom/client';
import { Issues } from './Issues'
import { PullReqs } from './PullReqs';
import { Collapsible } from '@repo/ui/Collapsible';


ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <Collapsible title="Issues">
      <Issues />
    </Collapsible>
    <Collapsible title="Pull requests">
      <PullReqs />
    </Collapsible>
 </React.StrictMode>
);

