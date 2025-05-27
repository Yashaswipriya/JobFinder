import React from 'react'

const Footer = () => {
  return (
   <footer className='py-6 bg-white'>
    <div className='mx-auto px-4 text-center text-black'>
        <p>&copy;{new Date().getFullYear()} JobFinder. All rights reserved.</p>
    </div>
   </footer>
  )
}

export default Footer
