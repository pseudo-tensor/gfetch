import { PRFetcher } from '@repo/api/pullreqs';
import { useState } from 'react';

import type { Endpoints } from '@octokit/types';
type PR = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'][number];

export function PullReqs() {

  const [prs, setPrs] = useState<PR[]>();

  const fetch = async () => {
    const result = await PRFetcher();
    setPrs(result.data);
    console.log(prs);
  }

  return (
    <div>
      <div>
        <button onClick={fetch}>Refresh</button>
      </div>
      {prs?.map((pr: PR) => {
        return <div key={pr.id}>
          <a href={pr.html_url}>
            <h2>#{pr.number}</h2>
            <h2>{pr.title}</h2>
          </a>
          <div>created by {pr.user?.login} at {pr.created_at}</div>
          <div>updated at {pr.updated_at}</div>
          <br/>
        </div>
      })}
    </div>
  )
}
