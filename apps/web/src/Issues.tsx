import { useEffect, useState } from 'react';
import { Issue } from '@repo/store/types';

export function Issues() {
  const [issues, setIssues] = useState<Issue[]>();

  useEffect(()=>{

    /* TODO: add code to set issues state */

  },[issues]);

  return (
    <div>
      <div>
        <button onClick={()=>{/* TODO: fetch the issues from here */}}>
          Refresh
        </button>
      </div>
      { issues?.map((issue: Issue) => {
        try {
          console.log(issues.length);
          return (
          <div key={issue.id}>
          <a href={issue.html_url}>
            <h4>#{issue.number}</h4>
            <h4>{issue.title}</h4>
          </a>
          <div>created by {issue.user?.login} at {issue.created_at}</div>
          <div>updated at {issue.updated_at}</div>
          <br />
        </div>)
        } catch(e) {
          console.log("render error");
          return (<div>hi</div>)
        }
        })}
    </div>
  );
}
