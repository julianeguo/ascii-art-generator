import {React, useRef, useState} from 'react';

function Process() {
    const [file, setFile] = useState(null); // file = user-selected file; setFile(file) = function that updates file
    const [ascii, setAscii] = useState(null);
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = async (e) => { // e is ChangeEvent object
        // e.target.files is a FileList; grab its first File or null
        // optional chaining (?.) - if e.target.files is null or undefined, results in undefined
        // nullish coalescing (??) - if e.target.files?.[0] is null or undefined, use null
        // const chosen = e.target.files?.[0] ?? null;
        // // store just the filename in React state
        // setFile(chosen ? chosen.name : null);
        const chosen = e.target.files?.[0];
        if (!chosen) return setFile(null);
        setFile(chosen.name);

        const formData = new FormData();
        formData.append("image", chosen);

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
            const { ascii: art } = await res.json();
            setAscii(art.join("\n"));
            console.log("Got JSON from server");
        }

        catch (err) {
            console.error("Fetch error:", err);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center">
            <button onClick={handleClick} className='custom-btn'>
                Upload image file
            </button>
            <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg, image/heic"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleChange}/>
            <span> {file || "No file chosen"} </span>
            </div>

            <pre>
                {ascii || ""}
            </pre>
        </div>
    );
}

export default Process;