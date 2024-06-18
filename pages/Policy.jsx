import React from 'react'

const Policy = () => {
    return (
        <section className='w-full flex flex-col justify-center items-center py-12 bg-bgAbout gap-8'>
            <article className='w-3/4 flex flex-col items-start gap-4'><h1 className='text-4xl font-extrabold text-titleAbout'>Privacy Policys</h1>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-titleAbout text-xl'>Introduction</h4>
                    <p>We value your privacy and are committed to protecting your personal data. This policy outlines how we handle your information.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl text-bold text-titleAbout'>Data Usage</h2>
                    <p>Your data is used for order processing, customer service, and marketing purposes. We process your data legally and transparently.</p>
                    <h4>Purpose of Data Usage</h4>
                    <ul className='px-10'>
                        <li className='list-disc'>To fulfill and manage orders.</li>
                        <li className='list-disc'>To provide customer support.</li>
                        <li className='list-disc'>To improve our website and services.</li>
                        <li className='list-disc'>To send promotional offers (with your consent).</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl text-bold text-titleAbout'>Data Protection</h2>
                    <p>We implement security measures such as encryption and secure servers to safeguard your data. Your information is retained only as long as necessary.</p>
                    <h4 className='text-titleAbout text-xl'>Security Measures</h4>
                    <ul className='px-10'>
                        <li className='list-disc'>Data encryption.</li>
                        <li className='list-disc'>Secure data storage.</li>
                        <li className='list-disc'>Access controls to personal data.</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl text-bold text-titleAbout'>Customer Rights</h2>
                    <p>You have the right to access, correct, and delete your data. To exercise these rights, contact us at our support email.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-titleAbout text-xl'>How to Exercise Your Rights</h4>
                    <p>Contact us at privacy@ourcompany.com with your request. We will respond within 30 days.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl text-bold text-titleAbout'>Contact Information</h2>
                    <p>For privacy concerns, please reach out to privacy@ourcompany.com.</p>
                </div>
            </article>
        </section>
    )
}


export default Policy;