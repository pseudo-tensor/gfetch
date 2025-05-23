import { Issue, Pull, Repo } from "./types";

export class MemoryStore {
  private MemoryStoreObject: {
    Repos: Repo[],
    Issues: Issue[],
    Pulls: Pull[]
  };

  public static instance: MemoryStore;

  private constructor() {
    this.MemoryStoreObject = {
      Repos: [],
      Issues: [],
      Pulls: []
    };
  };

  public getMemoryStoreObject = () => {
    if (MemoryStore.instance) return MemoryStore.instance;
    MemoryStore.instance = new MemoryStore();
    return MemoryStore.instance;
  }

  public setRepos = (data: Repo[]) => {
    this.MemoryStoreObject.Repos.push(...data);
  }

  public setIssues = (data: Issue[]) => {
    this.MemoryStoreObject.Issues.push(...data);
  }

  public setPulls = (data: Pull[]) => {
    this.MemoryStoreObject.Pulls.push(...data);
  }

  public getRepos = (): Repo[] => {
    return this.MemoryStoreObject.Repos;
  }

  public getIssues = (): Issue[] => {
    return this.MemoryStoreObject.Issues;
  }

  public getPulls = (): Pull[] => {
    return this.MemoryStoreObject.Pulls;
  }
}
