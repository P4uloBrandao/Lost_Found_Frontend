import React from 'react'
import Layout from './Layout';
import PRESENTATION from '../imgs/presentation.png';


const FirstSection = () => {
  return (
    <section>
        <Layout imgSrc={PRESENTATION} imgAlt={'Presentation icon'} title={'The unseen of spending three years at Pixelgrade'} imgClassName={'w-96'} pText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.'} btnText={'Learn More'} sectionClassName={'flex gap-10 items-center justify-around w-2/4 mt-80 mx-auto'} titleClassName={'text-2xl text-heroTitle w-firstSectionTitle font-bold'} pClassName={'text-communityP text-heroP'} classNameArt={'w-articleLayout flex flex-col items-start gap-4'} btnClassname={'bg-primaryGreen py-3 px-5 text-white text-communityP'}/>
    </section>
  )
}

export default FirstSection