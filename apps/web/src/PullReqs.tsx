import { PRFetcher } from '@repo/api/pullreqs';
import { useEffect, useState } from 'react';
import { Pull } from '@repo/store/types';

export function Pulls() {
  const [pulls, setPulls] = useState<Pull[]>();

  useEffect(() => {
    /* TODO: add code to set pulls state */
  }, [pulls]);

  return (
    <div>
      <div>
        <button onClick={() => {/* TODO: fetch pull requests here */}}>
          Refresh
        </button>
      </div>
      {pulls?.map((pr: Pull) => {
        console.log("prs");
        return (
        <div key={pr.id}>
          <a href={pr.html_url}>
            <h4>#{pr.number}</h4>
            <h4>{pr.title}</h4>
          </a>
          <div>created by {pr.user?.login} at {pr.created_at}</div>
          <div>updated at {pr.updated_at}</div>
          <br />
        </div>
      )
      })}
    </div>
  );
}
