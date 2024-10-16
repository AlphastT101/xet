import cv2
import numpy as np

def remove_black_background_and_crop(input_video_path, output_video_path, crop_pixels):
    # Open the input video
    cap = cv2.VideoCapture(input_video_path)

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Calculate the new width after cropping
    new_width = width - 2 * crop_pixels

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'H264')  # Codec for output video
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (new_width, height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Crop 100 pixels from both left and right
        cropped_frame = frame[:, crop_pixels:width - crop_pixels]

        # Create a mask for black pixels
        mask = cv2.inRange(cropped_frame, np.array([0, 0, 0]), np.array([50, 50, 50]))
        mask_inv = cv2.bitwise_not(mask)

        # Create a new frame where the black areas are transparent
        transparent_frame = np.zeros_like(cropped_frame)
        transparent_frame[mask_inv == 255] = cropped_frame[mask_inv == 255]

        # Write the processed frame to the output video
        out.write(transparent_frame)

    # Release everything
    cap.release()
    out.release()

# Usage
input_video = 'tablet.png'   # Replace with your input video file
output_video = 'earth_output.png'  # Replace with your desired output video file
remove_black_background_and_crop(input_video, output_video, crop_pixels=100)