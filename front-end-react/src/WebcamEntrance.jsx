import {React, useRef, useState} from 'react';
import { Link } from 'react-router-dom';

function WebcamEntrance() {

    return (
        <div className="flex justify-center items-center">
            <Link to="/webcam" className="custom-btn">
                Try live webcam ;-D ?
            </Link>
        </div>
    );
}

export default WebcamEntrance;