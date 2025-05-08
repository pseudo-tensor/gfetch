import octokit from './utils';

export async function PRFetcher(owner: string, repo: string) {
  const result = await octokit.request(`GET /repos/${owner}/${repo}/pulls`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }
  );
  return result;
}

