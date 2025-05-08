import React from 'react';
import { ReactNode, useState } from "react"

export const Collapsible = ({children, title} : {children: ReactNode, title: string}): React.JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return <div>
    <h2 onClick={()=>{setCollapsed(!collapsed)}}> {title} </h2>
    <div style={{display: collapsed? 'block' : 'none'}}>{children}</div>
  </div>
}
