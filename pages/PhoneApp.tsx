import React, { useEffect, useRef, useState } from 'react'

type Props = {}

function PhoneApp({ }: Props) {
    const $canvasRef = useRef<HTMLCanvasElement>(null)
    const $videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        function handleSuccess(stream: MediaStream) {
            if (!$videoRef.current) {
                return
            }

            $videoRef.current.srcObject = stream
        }

        function handleError(error: Error) {
            console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
        }

        async function initializeCamera() {
            const constraints = { video: true }

            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
                handleSuccess(mediaStream)
            } catch (error: unknown) {
                handleError(error as Error)
            }
        }

        initializeCamera()
    }, [])

    function handleClick() {
        if (!$canvasRef.current || !$videoRef.current) {
            return
        }

        $canvasRef.current.width = $videoRef.current.videoWidth
        $canvasRef.current.height = $videoRef.current.videoHeight

        $canvasRef.current.getContext('2d')?.drawImage($videoRef.current, 0, 0, $canvasRef.current.width, $canvasRef.current.height)
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <canvas ref={$canvasRef} width={800} height={450}></canvas>
            <video ref={$videoRef} width={800} height={450} autoPlay playsInline></video>
        </div>
    )
}

export default PhoneApp
