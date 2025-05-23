import type { Endpoints } from '@octokit/types';

export type Issue = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];
export type Pull = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'][number];
export type Repo = Endpoints['GET /orgs/{org}/repos']['response']['data'][number];

