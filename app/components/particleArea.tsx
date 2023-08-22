import React from 'react'
import Particles from 'react-tsparticles'
import ParticlesData  from './Particles.json'

const ParticleArea = () => {
      return (<>
      {/* @ts-ignore */}
      <Particles className='particles-js' params={ParticlesData} />
      </>)
}

export default ParticleArea
 