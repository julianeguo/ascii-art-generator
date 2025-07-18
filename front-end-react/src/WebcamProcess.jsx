import {React, useCallback, useRef, useState, useEffect} from 'react';
import Webcam from "react-webcam";

function WebcamProcess() {
    const webcamRef = useRef(null);
    const [asciiFrame, setAsciiFrame] = useState("");

    // copied from react-webcam use cases https://www.npmjs.com/package/react-webcam
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };

    // function that cconverts data URL to blob
    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]); // extract actual base64 data
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]; // extract frame type
        
        const byteNumbers = new Array(byteString.length); // initialize empty array for saving data
        for (let i = 0; i < byteString.length; i++) {
            byteNumbers[i] = byteString.charCodeAt(i); // apply .charCodeAt to each member to create an array of byte numbers
        }

        const byteArray = new Uint8Array(byteNumbers); // convert above result to Uint8 format
        const blob = new Blob([byteArray], {type: mimeString}); // feed the Uint8 array to make blob (binary large object)
        return blob;
    }

    // useCallback prevents function from being re-created on every render
    const capture = useCallback(async() => {
        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        const formData = new FormData();
        formData.append("image", dataURLtoBlob(imageSrc));

        try {
            // 1.
            const res = await fetch("http://127.0.0.1:5000/api/convert", {
                method: "POST",
                body: formData,
              });

            // 2. Checks for HTTP errors
            if (!res.ok) {
                console.error("Server returned non-OK:", res.status, await res.text());
                return;
            }

            // 3. Parses JSON
            const { ascii } = await res.json();
            setAsciiFrame(ascii.join("\n"));
            console.log("Got JSON from server");
        }
        catch (err) {
            console.error("Fetch error:", err);
        }


    }, [webcamRef])

     // calls capture repeatedly
    useEffect(() => {
        const intervalId = setInterval(() => {
        capture();
        }, 200); // adjust interval if needed

        return () => clearInterval(intervalId); // clean up
    }, [capture]);



    return (
        // code inside <Webcam> copied from react-webcam use cases https://www.npmjs.com/package/react-webcam
        <div>
            <pre>
                    {asciiFrame || ""}
            </pre>
            
            <div className="flex justify-center items-center">
                <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                // style={{ width: 1, height: 1, opacity: 0, pointerEvents: 'none', position: 'absolute' }}
                videoConstraints={videoConstraints}
                />
            </div>
        </div>
    );

}

export default WebcamProcess;