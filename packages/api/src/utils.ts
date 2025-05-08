import { Octokit } from 'octokit';
import type { Endpoints } from '@octokit/types';

type Repo = Endpoints['GET /orgs/{org}/repos']['response']['data'][number];

const octokit = new Octokit({});
export default octokit;

export const fetchAllRepos = async (owner: string) => {
  const result = await octokit.request(`GET /orgs/${owner}/repos`, {
    org: 'ORG',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  let resultArr: string[] = [];
  result.data.forEach((item: Repo) => {
    resultArr.push(item.name);
  });
  return resultArr;
}
