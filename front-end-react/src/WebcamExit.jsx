import {React, useRef, useState} from 'react';
import { Link } from 'react-router-dom';

function WebcamExit() {

    return (
        <div className="flex justify-center items-center">
            <Link to="/" className="custom-btn">
                Back to image upload :-D
            </Link>
        </div>
    );
}

export default WebcamExit;