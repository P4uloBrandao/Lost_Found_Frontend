import React from 'react'
import US from '../imgs/ussss.webp';
import LEFT from '../imgs/left.jpeg';
import RIGHT from '../imgs/right.png';
import PORTUGAL from '../imgs/portugal.jpg';
import VALUES from '../imgs/value.jpeg';
import SEPARATOR from '../imgs/separator.png';




const About = () => {
    return (
        <section className='w-full flex flex-col justify-center items-center py-12 bg-bgAbout gap-8'>
            <h1 className='text-5xl text-titleAbout font-bold'>About Us</h1>
            <article className='bg-white w-3/4 border-2 border-neutral-950 rounded-2xl p-8 shadow-xl shadow-black flex items-center justify-center'>
                <img className='w-2/5' src={US} alt="us team" />
                <div className='flex flex-col justify-center items-center gap-4 p-20'>
                    <h4 className='text-3xl text-titleAbout'>Our Team</h4>
                    <p>We are Duarte Miranda, Gonçalo Domingues, Joana Ribeiro, Carlos Martins, Paulo Brandão and Jorge Pérez, we are students at the University of Lisbon and the origin of the creation of this company is the merger of 3 subjects from the Information Technology degree.</p>
                </div>
            </article>
            <article className='bg-white w-3/4 border-2 border-neutral-950 rounded-2xl p-12 shadow-xl shadow-black flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl text-titleAbout'>Our Mission</h2>
                <div className='flex'>
                    <img src={LEFT} alt="lft img" />
                    <img src={RIGHT} alt="right img" />
                </div>
                <p className='text-center'>At Our Company, we are dedicated to providing high-quality watches, accessories, bracelets, and wallets to our customers in Portugal. Our mission is to offer stylish and affordable products that enhance our customers' lives.</p>
            </article>
            <article className='bg-white w-3/4 border-2 border-neutral-950 rounded-2xl p-12 shadow-xl shadow-black flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl text-titleAbout'>Our Story</h2>
                <img className='w-2/4 h-2/4 rounded-3xl' src={PORTUGAL} alt="bandera Portugal" />
                <p className='text-center'>
                    Founded in 2023, Our Company started with a vision to bring premium accessories to the Portuguese market. With a commitment to quality and customer satisfaction, we have grown to become a trusted name in the industry.</p>
            </article>
            <article className='bg-white w-3/4 border-2 border-neutral-950 rounded-2xl p-12 shadow-xl shadow-black flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl text-titleAbout'>Our Values</h2>
                <img className='w-2/4 h-2/4 rounded-3xl' src={VALUES} alt="icon Values" />
                <ul className='flex flex-col gap-4'>
                    <li><b>Quality:</b> We prioritize quality in everything we do, from our products to our customer service.</li>
                    <li><b>Customer Satisfaction: </b> Our customers are at the heart of our business, and we strive to exceed their expectations.</li>
                    <li><b>Integrity: </b> We conduct our business with honesty and integrity, building trust with our customers and partners.</li>
                    <li><b>Innovation:</b> We continuously seek to innovate and improve our product offerings to meet the changing needs of our customers.</li>
                </ul>
            </article>
            <img className='w-3/4 h-[30px] rounded-2xl mt-10' src={SEPARATOR} alt="separador" />
            <article className='w-3/4 flex flex-col gap-4'>
                <h2 className='text-4xl text-titleAbout font-bold self-start'>Meet the Team</h2>
                <p className='font-bold'>Our team is composed of passionate individuals who are experts in their fields. From product development to customer support, each team member plays a crucial role in our success.</p>
                <div>
                    <div className='flex flex-wrap gap-28 py-20 items-center justify-center'>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Duarte Miranda</h3>
                                <p>CEO</p>
                            </div>
                        </div>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Gonçalo Domingues</h3>
                                <p>CTO</p>
                            </div>
                        </div>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Joana Ribeiro</h3>
                                <p>COO</p>
                            </div>
                        </div>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Carlos Martins</h3>
                                <p>CMO</p>
                            </div>
                        </div>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Paulo Brandão</h3>
                                <p>CTO</p>
                            </div>
                        </div>
                        <div className='flex gap-4 w-80 border-2 border-green-500 rounded-2xl p-4 items-center justify-center shadow-md shadow-green-400'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-2xl text-titleAbout'>Jorge Pérez</h3>
                                <p>CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <img className='w-3/4 h-[30px] rounded-2xl mt-10' src={SEPARATOR} alt="separador" />
            <article className='w-3/4 flex flex-col gap-4'>
                <h4 className='text-3xl text-titleAbout'>Contact Us</h4>
                <p>If you have any questions or need assistance, please do not hesitate to contact us at contact@ourcompany.com. We are here to help and look forward to hearing from you.</p>
            </article>
        </section>
    )
}


export default About;