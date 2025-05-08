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
        const result = await IssueFetcher(ownerRepo.owner, ownerRepo.repo);
        setIssues(result.data);
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
              const result = await IssueFetcher(ownerRepo.owner, ownerRepo.repo);
              setIssues(result.data);
            };
            fetchIssues();
          }
        }}>
          Refresh
        </button>
      </div>
      {issues?.map((issue: Issue) => (
        <div key={issue.id}>
          <a href={issue.html_url}>
            <h2>#{issue.number}</h2>
            <h2>{issue.title}</h2>
          </a>
          <div>created by {issue.user?.login} at {issue.created_at}</div>
          <div>updated at {issue.updated_at}</div>
          <br />
        </div>
      ))}
    </div>
  );
}
