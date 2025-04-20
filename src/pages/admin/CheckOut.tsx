"use client";

import { Suspense, useState } from 'react'
// import Link from 'next/link';
import Loading from '../../components/Loading';
import ObjectDetection from '../../components/ObjectDetection';
import { Scanner } from '@yudiel/react-qr-scanner';



const CheckoutPage = () => {

    const [qrCode, setQrCode] = useState<string | null>(null);

    return (
        <div className='flex flex-col items-center h-screen bg-gray-400 p-8'>

            <section className='flex flex-col items-center bg-gray-200 p-6 rounded-4xl shadow-lg w-5/6 h-4/5'>
                
                {qrCode ? (
                    <Suspense fallback={<Loading />}>
                        {/* webcam + canvas */}
                        <ObjectDetection token={qrCode} />
                    </Suspense>
                ) : (
                    <div className='flex flex-col items-center justify-center h-5/6 mt-10'>
                        <Scanner onScan={(result) => {console.log(result); setQrCode(result[0].rawValue); }}  />
                        <div className='flex flex-col bg-blue-200 p-4 rounded-lg shadow-md mt-5'>
                            <p className='text-blue-500'>Please scan here to start!</p>
                        </div>
                    </div>
                )
             }


            </section>
        </div>
    );
};


export default CheckoutPage;