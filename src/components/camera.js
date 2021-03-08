import React,{useRef,Fragment,useState} from 'react';
import {Camera } from 'react-cam';
import ReactCrop from 'react-image-crop';

const camera = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
    const [imagCapture,setCapture] = useState('');
     // eslint-disable-next-line react-hooks/rules-of-hooks
    const cam = useRef(null);
    function capture(imgSrc) {
        localStorage.setItem('img',imgSrc);
        setCapture(localStorage.getItem('img'));
      }
   
    return (
        <Fragment>
      <Camera
        showFocus={true}
        front={false}
        capture={capture}
        ref={cam}
        width="auto"
        height="100%"
        focusWidth="auto"
        focusHeight="auto"
        btnColor="white"
      />
      <div>
      <button onClick={img => cam.current.capture(img)}>Take image</button>

      <input type="file" onChange={e => setCapture(e.target.value)}></input>
      <div>
        <img src={imagCapture} alt="local" /><br />
        <button><a href="/print">save</a></button>
        <button>Delete</button>
      </div>
      </div>
    </Fragment>
    )
}

export default camera
