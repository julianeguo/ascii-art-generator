from flask import Flask, request, jsonify
from flask_cors import CORS
from ascii_converter import resize_and_process_ascii
import numpy as np
import cv2 as cv

app = Flask(__name__)
CORS(app)

@app.route("/api/convert", methods=['POST'])
def convert():
    img_file = request.files.get("image")
    if not img_file:
        print("no file received")
        return jsonify({"error": "No file uploaded"}), 400
    
    print("received file")
    
    data = img_file.read() # raw bytes
    nparr = np.frombuffer(data, dtype=np.uint8)   # 1D uint8 array
    img = cv.imdecode(nparr, cv.IMREAD_COLOR)     # 2D/3D cv image
    
    # jsonify should return an array of strings, each string = 1 line
    ascii_string_matrix = resize_and_process_ascii(img)
    # returns the string array
    return jsonify({"ascii": ascii_string_matrix})



if __name__ == "__main__": # Python's start-up logic
    # port 5000 is default
    app.run(host="0.0.0.0", port=5000, debug=True)