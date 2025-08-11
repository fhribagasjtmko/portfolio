import React from 'react'
export default function Layout({children}){
  return (
    <div className="app-root">
      <main className="main-area">
        {children}
      </main>
    </div>
  )
}
