import React, { useState } from "react";

const UploadImage = () => {
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit =  (e) => {
      e.preventDefault();
      setLoading(true);
     
      const formData = new FormData();
      images.forEach((image)=>
      formData.append("files", image, image.name)
      )

      if (!images) {
          return;
      }
  
      try {
        fetch("http://localhost:8000/api/uploadImg", {
          method: "POST",
          body: formData,
        })
        .then(res => res.json())
        .then(function(res){
            console.log(res)
        })
      } catch (err) {
        console.error(err);
      }
  
      setLoading(false);
    };
    return (
      <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple 
        onChange={(e) => setImages(Array.from(e.target.files))}
        accept="image/*"
      />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
    )
  }
  

  
export default UploadImage