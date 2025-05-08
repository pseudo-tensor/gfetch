import { PRFetcher } from '@repo/api/pullreqs';
import { useEffect, useState } from 'react';

import type { Endpoints } from '@octokit/types';
type PR = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'][number];

export function Pulls() {
  const [pulls, setPulls] = useState<PR[]>();
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

  // Fetch pull requests when ownerRepo is updated
  useEffect(() => {
    if (ownerRepo?.owner && ownerRepo?.repo) {
      const fetchPulls = async () => {
        const result = await PRFetcher(ownerRepo.owner, ownerRepo.repo);
        setPulls(result.data);
      };
      fetchPulls();
    }
  }, [ownerRepo]);

  return (
    <div>
      <div>
        <button onClick={() => {
          if (ownerRepo?.owner && ownerRepo.repo) {
            const fetchPulls = async () => {
              const result = await PRFetcher(ownerRepo.owner, ownerRepo.repo);
              setPulls(result.data);
            };
            fetchPulls();
          }
        }}>
          Refresh
        </button>
      </div>
      {pulls?.map((pr: PR) => {
        console.log("prs");
        return (
        <div key={pr.id}>
          <a href={pr.html_url}>
            <h4>#{pr.number}</h4>
            <h4>{pr.title}</h4>
          </a>
          <div>created by {pr.user?.login} at {pr.created_at}</div>
          <div>updated at {pr.updated_at}</div>
          <br />
        </div>
      )
      })}
    </div>
  );
}
