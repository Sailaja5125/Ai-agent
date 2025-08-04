import AgentPage from '@/components/AgentPage'
import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <div className="bg-[#151515] min-h-screen">
      <Navbar hidden={true}/>
      <AgentPage/>
    </div>
  )
}

export default page
