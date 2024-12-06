import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { storage, db, auth } from "../firebaseConfig"; // Import the Firebase services (storage, db, and auth)

const Upload = () => {
  const [quoteText, setQuoteText] = useState("");
  const [image, setImage] = useState(null);
  
  const handleUpload = async () => {
    if (image && quoteText) {
      const storageRef = ref(storage, `images/${image.name}`);

      try {
        await uploadBytes(storageRef, image);
        console.log("Image uploaded successfully!");
        
        const imageUrl = await getDownloadURL(storageRef);
        
        // Save the quote and image URL to Firestore
        const quotesRef = collection(db, "quotes");
        await addDoc(quotesRef, {
          quote: quoteText,
          image: imageUrl,
          userId: auth.currentUser.uid, // Store the user ID with the quote
        });

        console.log("Quote and image uploaded to Firestore!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("Please fill in the quote and select an image.");
    }
  };

  return (
    <div>
      <h1>Upload Quote and Image</h1>
      <input
        type="text"
        placeholder="Enter your quote"
        value={quoteText}
        onChange={(e) => setQuoteText(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
