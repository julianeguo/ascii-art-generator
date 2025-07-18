import cv2 as cv
import numpy as np
import sys
# import keyboard
import readchar

# reads image
def read_img(img_name):
    img = cv.imread(img_name)
    if img is None:
        sys.exit("Could not read the image.")
    print("Successfully loaded image!")
    # displays image in a window
    cv.imshow("Display window", img)
    return img


# resizes image and processes into ascii
def resize_and_process_ascii(img):
    # accesses image h, w, c
    height, width = img.shape[:2] # from beginning up to (and excluding) index 2; tuple slicing -> my_tuple[start:stop:step]
    print(f"Image original dimensions: {height}x{width}")

    # resize image so not as large
    TARGET_WIDTH = 300 # target # of ascii characters
    new_height = int(TARGET_WIDTH * (height / width) * 0.5)
    resized_img = cv.resize(img, (TARGET_WIDTH, new_height), interpolation=cv.INTER_AREA) # resizing; INTER_AREA is best for shrinking an image

    # defines arrays
    lightness_array = np.zeros((new_height, TARGET_WIDTH), dtype=np.uint8)
    ascii_str = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$" # 67 literal characters
    ascii_array = np.zeros((new_height, TARGET_WIDTH), dtype='<U1') # each element holds max 1 unicode character, < means little endian

    # averages pixels to calculate lightness 
    for x in range(new_height):
        for y in range(TARGET_WIDTH):
            b, g, r = resized_img[x][y]
            b, g, r = int(b), int(g), int(r) # cast to int so no overflow
            li = (max(b, g, r) + min(b, g, r)) // 2
            lightness_array[x][y] = li
            idx = li * (len(ascii_str) - 1) // 255
            ascii_array[x][y] = ascii_str[idx] # use len(ascii_str) - 1 - idx if want


    return_string_matrix = []
    # combines characters for printing
    for row in ascii_array:
        line = "".join(row)
        return_string_matrix.append(line)
        # print(line)

    return return_string_matrix
    


# main function
def return_ascii():
    return_string = ""
    # check keys
    wpressed = 0
    while True:
        print("Press i for ASCII from image, w for live web cam :-D, q to quit all windows.")
        key_iorw = readchar.readkey()
        if key_iorw == "i": # converts user-inputted image to ascii
            img_name = input("Enter the exact name of the image file: ")
            img = read_img(img_name)
            return_string = resize_and_process_ascii(img)

        elif key_iorw == "w": # connects to webcam
            wpressed = 1
            cap = cv.VideoCapture(0) # param is camera #, put 0 or -1 if just one camera - doesn't matter
            if not cap.isOpened():
                print("Cannot open camera")
                exit()
            while True:
                ret, frame = cap.read()
                 # if frame is read correctly ret is True
                if not ret:
                    print("Can't receive frame (stream end?). Exiting ...")
                    break
                resize_and_process_ascii(frame)

        elif key_iorw == "q":
            print("quitting")
            break
        else:
            print("unknown key!")
            print("Press i for ASCII from image, w for live web cam :-D, q to quit all windows")

    if wpressed == 1:
        cap.release()
    
    return 
    


# if __name__ == "__main__":
#     main()
