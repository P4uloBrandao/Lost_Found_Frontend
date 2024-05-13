import React from 'react'
import Layout from './Layout'
import PHONE from '../imgs/phone.png';

const ThirdSection = () => {
  return (
    <section>
        <Layout imgSrc={PHONE} imgAlt={'phone icon'} title={'How to design your site footer like we did'} imgClassName={'w-96'} pText={'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.'} btnText={'Learn More'} sectionClassName={'flex gap-10 items-center justify-around w-2/4 mt-80 mx-auto'} titleClassName={'text-2xl text-heroTitle w-firstSectionTitle font-bold'} pClassName={'text-communityP text-heroP'} classNameArt={'w-articleLayout flex flex-col items-start gap-4'} btnClassname={'bg-primaryGreen py-3 px-5 text-white text-communityP'}/>
    </section>
  )
}

export default ThirdSection