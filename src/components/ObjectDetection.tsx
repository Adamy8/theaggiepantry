"use client";

import {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
// import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
await tf.setBackend('webgl'); 
await tf.ready();

import LoadingCVModel from "./LoadingCV";
import {renderPredictions} from "./renderPredictions";
import { Button } from "../components/ui/button"
import { useAuth0 } from '@auth0/auth0-react';


const categories = [ "banana", "carrot", "bottle", "broccoli", "donut"];
let detectInterval;  // set this as global variable to clear it later


const ObjectDetection = (qrCode) => {
    const [isloading, setIsLoading] = useState(true);
    const [results, setResults] = useState("");
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { getAccessTokenSilently } = useAuth0();

    const handleCheckout = async (objs:string) => {
        // Handle checkout logic here
        console.log("Checkout button clicked: ", objs);
        const token = await getAccessTokenSilently();

        try {
            const res = await fetch('/api/checkout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ "token": qrCode.token, "items": objs }),
            });
            if (!res.ok) {throw new Error(`Failed to checkout: ${res.status}`);}
            const result = await res.json();
            console.log('Checkout successful:', result);
        } catch (err) {
            console.error('Error during checkout:', err);
        }
    }

    const runCoco = async () => {
        setIsLoading(true);
        console.log("Loading Coco SSD model...");
        const net = await cocoSsd.load();
        setIsLoading(false);
        console.log("Coco SSD model loaded.");

        detectInterval =  setInterval(() => {       // global variable : detectInterval
            runObjectDetection(net);
        }, 500); };  // ms

    const runObjectDetection = async (net) => {
        console.log("Running object detection...");
        if (
            canvasRef.current &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ){
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const detectedObjects = await net.detect(webcamRef.current.video,undefined,0.5);
            // console.log(detectedObjects);
            // filter
            const filteredObjects = detectedObjects.filter((object) => {
                return categories.includes(object.class);
            });
            // console.log(filteredObjects);

            const context = canvasRef.current.getContext("2d");
            renderPredictions(filteredObjects, context);

            setResults("");
            filteredObjects.forEach((object) => {
                // console.log(object.class);
                setResults((prevResults) => prevResults + object.class + ", ");
            })
        }
    }

    const showmyVideo = () => {
        if (
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            const video = webcamRef.current.video as HTMLVideoElement;
            const myVideoWidth = video.videoWidth;
            const myVideoHeight = video.videoHeight;
    
            video.width = myVideoWidth;
            video.height = myVideoHeight;
        }
      };
    
    useEffect(() => {
        runCoco();
        showmyVideo();
    }, []);



    return(
        <div className="relative w-full h-full">
            {isloading ? (
                <div className='flex w-full h-full justify-center items-center bg-gray-300'>
                    <LoadingCVModel />
                </div>
            ) : (
                <div className= 'relative w-full h-full'>
                    <div className='relative w-full h-full'>
                        {/* Webcam */}
                        <Webcam 
                            audio={false} 
                            ref={webcamRef}
                            className="absolute top-0 left-0 w-full h-full p-4 bg-gray-300 rounded-3xl shadow-lg" 
                            muted 
                        />
                        {/* Canvas */}
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full p-4"
                        />
                    </div>
                </div>
            )}

            <div className='flex flex-col bg-blue-200 p-4 rounded-lg shadow-md mt-5'>
                <p className='text-blue-500'>Detected items: {results || "No items detected yet"}</p>
                <div className="flex justify-end">
                    <Button variant="outline" className="bg-blue-500 text-white mt-2 hover:bg-blue-600"
                    onClick={() => handleCheckout(results)}>
                        Ready to check out?
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default ObjectDetection;
