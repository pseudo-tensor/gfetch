// TODO: Remove this type and streamline this approach for fetching current tab details

type OwnerRepoStruct = {
  owner: string,
  repo: string
}

let RepoObject: OwnerRepoStruct;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length > 0 && tabs[0].url) {
    const url = tabs[0].url;
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      RepoObject = { owner: match[1], repo: match[2] };
    } else {
      console.error("Not a valid GitHub repository URL");
    }
  }
});

