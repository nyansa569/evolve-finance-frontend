import React from 'react'
import { Outlet } from 'react-router-dom'

function LobbyLayout() {
  return (
    <main className={"min-h-dvh flex flex-col"}>
        <div className={"flex-1 "}>{<Outlet />}</div>
    </main>
  )
}

export default LobbyLayout