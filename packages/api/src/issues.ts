import octokit from './octokitInstance';

export async function IssueFetcher(owner: string, repo: string) {
  const result = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return result;
}
