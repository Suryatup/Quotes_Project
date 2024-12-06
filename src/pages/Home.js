import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import QuoteCard from "../components/QuoteCard";

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      const quotesRef = collection(db, "quotes");
      const querySnapshot = await getDocs(quotesRef);
      setQuotes(querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        quoteId: doc.id  // Adding document ID for deleting and updating
      })));
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchQuotes();
      } else {
        setUser(null);
        fetchQuotes();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {quotes.map((quote, index) => (
        <QuoteCard
          key={index}
          quote={quote.quote}
          image={quote.image}
          userId={quote.userId}
          quoteId={quote.quoteId}
          currentUser={user}
          likes={quote.likes}  // Pass likes count
          comments={quote.comments || []}  // Pass existing comments
        />
      ))}
    </div>
  );
};

export default Home;
