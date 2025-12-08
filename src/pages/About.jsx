import React from 'react'
import aboutPic1 from '../assets/countryside-workers-out-field.webp';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiPlantFill } from 'react-icons/pi';
import { FaTractor } from 'react-icons/fa';

export default function About(){

  return(
<div style={{ display: "flex", padding: '15px' }}>
  <div>
    <h2>ABOUT US</h2>
    <p>
      We are a business and investment educational hub, offering real-ground business expertise from real entrepreneurs and businessmen. These are skills that you won't learn in business school.<br/>
      As a team with a variety of expertise, we charge between TZS 3,500 and TZS 5,000 to cover platform operating expenses.<br/>
      One might ask, why should I bother improving my financial IQ? "Just to have more options," I reply. Significant global changes will occur in coming years, and if you don't adapt, it will be a frightening period. In the real world, something more than just school grades are required.
    </p>

    <h2>What’s Ahead</h2>
    
    <div>• You’ll learn how to identify and evaluate potential business opportunities, particularly focusing on existing social problems. The pursuit of opportunity without regard to resources you currently control.</div>
    <div>• You’ll learn about the various legal forms of business organization, their pros and cons, and decide which organization is best for your venture. How to comply with authority legal compliance.</div>
    <div>• You’ll learn how key components of the enterprise work together to make money and how to begin to test your business model with real customers. Step-by-step process for formulating strategy and aligning business activities with it.</div>
    <div>• You’ll learn how to write a Business Plan or Investors Pitch Deck that incorporates all elements of your business idea, explaining the opportunity, target market, and all details about how your business expects to pursue the opportunity.</div>
    <div>• You’ll learn the financing requirements that businesses typically encounter in the first phase of their life cycles and how to get the funding to finance these various stages of your enterprise.</div>
    
  </div>
</div>

  )
}
