import {useRef} from "react";
import imagePicker from "./func";

export default function ImageCompress() {
    const originalRef = useRef(null);
    const compressRef = useRef(null);

    const _logFormData = (formData) => {
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
    }

    const handlePick = async (e) => {
        const files = e.target.files;
        // Compress
        const res = await imagePicker(files, originalRef, compressRef);

        // Upload to server
        const formData = new FormData();
        formData.append('image', res.source, res.fileName);
    }

    return (
        <>
            <input type="file" onChange={handlePick}/>
            <hr/>

            <label>Original Image: </label>
            <img width={400} ref={originalRef}/>

            <label>Compress Image: </label>
            <img width={200} ref={compressRef}/>
        </>
    )
}
