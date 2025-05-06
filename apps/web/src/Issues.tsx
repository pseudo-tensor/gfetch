import { IssueFetcher } from '@repo/api/issues';
import { PRFetcher } from '@repo/api/pullreqs';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import type { Endpoints } from '@octokit/types';
type Issue = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];

export function Issues() {

  const [issues, setIssues] = useState<Issue[]>();

  const fetch = async () => {
    const result = await IssueFetcher();
    setIssues(result.data);
    console.log(issues);
    const result2 = await PRFetcher();
    console.log(result2);
  }

  return (
    <div>
      Issues
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
          <div><ReactMarkdown>{issue.body}</ReactMarkdown></div>
          <br/>
        </div>
      })}
    </div>
  )
}
