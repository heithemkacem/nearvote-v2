import React from 'react'
export const Footer = (props) => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 
            {year} All Right Reserved
           
          </p>
        </div>
      </div>
    </div>
  )
}
