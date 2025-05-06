import octokit from './octokitInstance';

export async function PRFetcher() {
  const result = await octokit.request('GET /repos/{owner}/{repo}/pulls', 
    {
      owner: 'asyncapi',
      repo: 'cli',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }
  );
  return result;
}

