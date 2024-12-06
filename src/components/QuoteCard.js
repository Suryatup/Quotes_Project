import React, { useState } from "react";
import { Button, Card, CardContent, Typography, CardMedia, IconButton, TextField, Box } from "@mui/material";
import { deleteDoc, doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ThumbUp, Comment } from "@mui/icons-material";

const QuoteCard = ({ quote, image, userId, quoteId, currentUser, likes, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments || []);
  const [likeCount, setLikeCount] = useState(likes || 0);

  const handleDelete = async () => {
    try {
      if (currentUser && currentUser.uid === userId) {
        const quoteRef = doc(db, "quotes", quoteId);
        await deleteDoc(quoteRef);
        alert("Quote deleted successfully!");
      } else {
        alert("You can only delete your own quotes.");
      }
    } catch (error) {
      alert(`Error deleting quote: ${error.message}`);
    }
  };

  const handleLike = async () => {
    const quoteRef = doc(db, "quotes", quoteId);
    try {
      // Use Firestore's increment function to increment the like count
      await updateDoc(quoteRef, {
        likes: increment(1)  // Increment the like count in Firestore
      });
      setLikeCount(likeCount + 1);  // Update local state for instant UI update
    } catch (error) {
      alert("Error liking the quote");
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;  // Ignore empty comments
  
    const quoteRef = doc(db, "quotes", quoteId);
    try {
      await updateDoc(quoteRef, {
        comments: arrayUnion({ userId: currentUser.uid, comment: newComment })
      });
      setLocalComments([...localComments, { userId: currentUser.uid, comment: newComment }]);
      setNewComment("");  // Clear input field after comment
    } catch (error) {
      alert("Error adding comment");
    }
  };
  

  return (
    <Card sx={{ maxWidth: 345, margin: "20px" }}>
      {image && <CardMedia component="img" height="140" image={image} />}
      <CardContent>
        <Typography variant="h5" component="div">
          {quote}
        </Typography>

        {/* Like Button Section */}
        <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
          <IconButton onClick={handleLike} color="primary">
            <ThumbUp />
          </IconButton>
          <Typography variant="body1">{likeCount} Likes</Typography>
        </Box>

        {/* Comment Section */}
        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={2}
          />
          <Button variant="contained" color="primary" onClick={handleComment} sx={{ marginTop: 1 }}>
            Comment
          </Button>
        </Box>

        {/* Display Comments */}
        <Box sx={{ marginTop: 2 }}>
          {localComments.map((comment, index) => (
            <Typography key={index} variant="body2" color="textSecondary">
              {comment.comment}
            </Typography>
          ))}
        </Box>

        {/* Delete Button - Only visible to the quote owner */}
        {currentUser && currentUser.uid === userId && (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
