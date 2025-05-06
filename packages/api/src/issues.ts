import octokit from './octokitInstance';

export async function IssueFetcher() {
  const result = await octokit.request('GET /repos/asyncapi/cli/issues',
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
