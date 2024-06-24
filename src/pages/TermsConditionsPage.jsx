import React from 'react'

const Terms = () => {
    return (
        <div className="" style={{ width: '90%', marginTop: '30px', marginBottom: '30px', alignSelf: 'center' }}>
        <section className='w-full flex flex-col justify-center items-center py-12 bg-bgAbout gap-8'>
            <article className='w-3/4 flex flex-col items-start gap-4'>
            <h1 className='text-3xl font-extrabold text-titleAbout'>Terms and Conditions</h1>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-titleAbout text-xl'>Introduction</h4>
                    <p>Welcome to our online store. By using our website, you agree to these terms and conditions. These terms apply exclusively to Portugal.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 1 - General Provisions</h2>
                    <p>These terms and conditions regulate the use of our online store. By accessing and using our website, you agree to comply with these terms. We reserve the right to update these terms at any time without prior notice.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 2 - Orders</h2>
                    <p>Orders can be placed through our website by creating an account. Ensure all details are accurate to avoid any issues with your order.</p>
                    <h4 className='text-titleAbout text-xl'>Other Process</h4>
                    <ul className='px-10'>
                        <li className='list-disc'>Create an account on our website.</li>
                        <li className='list-disc'>Select products and add them to your cart.</li>
                        <li className='list-disc'>Proceed to checkout and enter the required information.</li>
                        <li className='list-disc'>Confirm your order and make the payment.</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 3 - Payment</h2>
                    <p>We accept the following payment methods via Stripe Payments:</p>
                    <ul className='px-10'>
                        <li className='list-disc'>Credit Card (Visa, Mastercard)</li>
                        <li className='list-disc'>Apple Pay</li>
                        <li className='list-disc'>Google Pay</li>
                    </ul>
                    <p>Payments are processed immediately upon order confirmation. Refunds are provided if services are unavailable.</p>
                    <h4 className='text-titleAbout text-xl'>Secure Payment</h4>
                    <p>All transactions are secure and encrypted. We do not store your payment information.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 4 - Delivery</h2>
                    <p>Products are delivered within the specified timeframes. Ensure accurate delivery information is provided. Delivery times may vary based on location.</p>
                    <h4 className='text-titleAbout text-xl'>Delivery Process</h4>
                    <ul className='px-10'>
                        <li className='list-disc'>Orders are processed within 2 business days.</li>
                        <li className='list-disc'>Delivery times range from 3 to 7 business days depending on the location.</li>
                        <li className='list-disc'>Customers will receive a tracking number once the order is shipped.</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 5 - Prices and Taxes</h2>
                    <p>All prices include applicable taxes. We reserve the right to change prices without notice. The prices at the time of order confirmation are final.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 6 - Cancellation and Returns</h2>
                    <p>You can cancel orders and return products according to our return policy. Refunds are processed within a specified period after the returned items are received.</p>
                    <h4>Return Policy</h4>
                    <ul className='px-10'>
                        <li className='list-disc'>Products can be returned within 14 days of delivery.</li>
                        <li className='list-disc'>Returned items must be in their original condition.</li>
                        <li className='list-disc'>Refunds are processed within 7 business days after receiving the returned items.</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Article 7 - Customer Data</h2>
                    <p>We are committed to protecting your personal data. Refer to our Privacy Policy for detailed information on how we handle your data.</p>
                    <h4 className='text-titleAbout text-xl'>Data Protection</h4>
                    <p>We implement strict security measures to ensure your data is protected. Personal information is only used for processing orders and improving our services.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl text-bold text-titleAbout'>Contact Information</h2>
                    <p>For support and inquiries, contact us at bidfinderEmail@gmail.com.</p>
                </div>
            </article>
        </section>
        </div>
    )
}


export default Terms;