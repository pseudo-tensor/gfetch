import octokit from './utils';
import { fetchAllRepos } from './utils';
import type { Endpoints } from '@octokit/types';

type Data = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];


export async function IssueFetcher(owner: string, repo: string) {
  const result = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const temp = await allIssueFetcher(owner, repo);
  console.log("temp is", temp);
  console.log("result is", result);
  return result;
}

export async function allIssueFetcher(owner: string, repo: string) {
  console.log(repo);
  const repos = await fetchAllRepos(owner);
  let resultArr : {
    data: Data[]
  } = {
      data: []
    };
  repos.forEach(async (repo: string) => {
    const result = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    result.data.forEach((item: Data) => {
      resultArr.data.push(item)
    })
  })
  return resultArr;
}
