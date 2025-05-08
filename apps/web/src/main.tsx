import ReactDOM from 'react-dom/client';
import { Issues } from './Issues'
import { Pulls } from './PullReqs';
import { Collapsible } from '@repo/ui/Collapsible';


ReactDOM.createRoot(document.getElementById("app")!).render(
    <div>
      <Collapsible title="Issues">
        <Issues />
      </Collapsible>
      <Collapsible title="Pull requests">
        <Pulls />
      </Collapsible>
    </div>
);

