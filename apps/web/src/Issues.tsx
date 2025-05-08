import { IssueFetcher } from '@repo/api/issues';
import { useEffect, useState } from 'react';

import type { Endpoints } from '@octokit/types';
type Issue = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];

export function Issues() {
  const [issues, setIssues] = useState<Issue[]>();
  const [ownerRepo, setOwnerRepo] = useState<{ owner: string; repo: string } | null>(null);

  // Extract owner and repo from the active tab's URL
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        const url = tabs[0].url;
        const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (match) {
          setOwnerRepo({ owner: match[1], repo: match[2] });
        } else {
          console.error("Not a valid GitHub repository URL");
        }
      }
    });
  }, []);

  // Fetch issues when ownerRepo is updated
  useEffect(() => {
    if (ownerRepo?.owner && ownerRepo?.repo) {
      const fetchIssues = async () => {
        const result = (await IssueFetcher(ownerRepo.owner, ownerRepo.repo)).data;
        setIssues(result);
      };
      fetchIssues();
    }
  }, [ownerRepo]);

  return (
    <div>
      <div>
        <button onClick={() => {
          if (ownerRepo?.owner && ownerRepo.repo) {
            const fetchIssues = async () => {
              const result = (await IssueFetcher(ownerRepo.owner, ownerRepo.repo)).data;
              setIssues(result);
            };
            fetchIssues();
          }
        }}>
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
