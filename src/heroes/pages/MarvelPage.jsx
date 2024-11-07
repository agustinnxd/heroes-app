import React from 'react'
import { HeroList } from '../components'

export const MarvelPage = () => {
  return (
    <div className='py-2'>
      <h1>Marvel</h1>
      <hr />

      <HeroList publisher={'Marvel Comics'}/>
    </div>
  )
}
