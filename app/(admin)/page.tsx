import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Home() {
  return (
    <main>
      <div className="container">
        <h2 className="text-3xl font-bold text-primary py-5">Dashboard</h2>
      </div>
    </main>
  )
}
