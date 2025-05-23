import { Octokit } from 'octokit';

const octokit = new Octokit({});

export const fetchPulls = async (owner: string, repo: string) => {
  const result = await octokit.request(`GET /repos/${owner}/${repo}/pulls`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }
  );
  return result;
}

export const fetchIssues = async (owner: string, repo: string) => {
  const result = await octokit.request(`GET /repos/${owner}/${repo}/issues`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }
  );
  return result;
}

export const fetchRepos = async (owner: string) => {
  const result = await octokit.request(`GET /orgs/${owner}/repos`, {
    org: 'ORG',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return result;
}
