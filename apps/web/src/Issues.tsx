import { IssueFetcher } from '@repo/api/issues';
import { useEffect, useState } from 'react';

import type { Endpoints } from '@octokit/types';
type Issue = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];

export function Issues() {

  const [issues, setIssues] = useState<Issue[]>();
  useEffect(()=>{
    const fetch = async () => {
      const result = await IssueFetcher();
      setIssues(result.data);
    }
    fetch();
  }, [])

  const fetch = async () => {
    const result = await IssueFetcher();
    setIssues(result.data);
  }

  return (
    <div>
      <div>
        <button onClick={fetch}>Refresh</button>
      </div>
      {issues?.map((issue: Issue) => {
        return <div key={issue.id}>
          <a href={issue.html_url}>
            <h2>#{issue.number}</h2>
            <h2>{issue.title}</h2>
          </a>
          <div>created by {issue.user?.login} at {issue.created_at}</div>
          <div>updated at {issue.updated_at}</div>
          <br/>
        </div>
      })}
    </div>
  )
}
