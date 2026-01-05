import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { TbLoader3, TbLoaderQuarter } from 'react-icons/tb'
import { VscLoading } from 'react-icons/vsc'

export default function MiniLoadingSpinner() {
  return (
    <div className='centered flex-Column' style={{height:"100%", width:"100%", color:"#F4B342"}}>
      <div className='loadingSpinner'>
        <TbLoader3 style={{fontSize:'100px'}}/>
      </div>
      <span className='h4 loadingHover'>Loading ... </span>
    </div>
  )
}
