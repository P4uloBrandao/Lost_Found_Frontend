import React from 'react';
import GROUP from '../imgs/groupIcon.png';
import BUILDING from '../imgs/buildingIcon.png';
import HANDS from '../imgs/hands icon.png';
import Article from './Article';


const Community = () => {
  return (
    <section className='flex flex-col justify-center items-center gap-8'>
        <header className='flex flex-col justify-center items-center gap-2'>
            <h2 className='text-3xl text-center text-heroTitle w-titleCommunity font-bold'>Manage your entire community in a single system</h2>
            <p className='text-xs text-heroP'>Who is Nextcent suitable for?</p>
        </header>
        <section className='flex items-center justify-evenly w-full'>
            <Article textClassName={'text-2xl text-center text-heroTitle font-bold pt-6'} pClassName={'text-center text-heroP text-communityP'} imgClassName={'w-10 h-10'} articleClassName={'p-6 shadow-sm w-52 flex flex-col justify-center items-center'} imgSrc={GROUP} imgAlt={'Group icon'} text={'Membership Organisations'} pText={'Our membership management software provides full automation of membership renewals and payments'}/>
            <Article textClassName={'text-2xl text-center text-heroTitle font-bold pt-6'} pClassName={'text-center text-heroP text-communityP'} imgClassName={'w-10 h-10'} articleClassName={'p-6 shadow-sm w-52 flex flex-col justify-center items-center'} imgSrc={BUILDING} imgAlt={'Group icon'} text={'National Associations'} pText={'Our membership management software provides full automation of membership renewals and payments'}/>
            <Article textClassName={'text-2xl text-center text-heroTitle font-bold pt-6'} pClassName={'text-center text-heroP text-communityP'} imgClassName={'w-10 h-10'} articleClassName={'p-6 shadow-sm w-52 flex flex-col justify-center items-center'} imgSrc={HANDS} imgAlt={'Group icon'} text={'Clubs And Groups'} pText={'Our membership management software provides full automation of membership renewals and payments'}/>
        </section>
    </section>
  )
}

export default Community