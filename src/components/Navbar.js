import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Quotes Upload
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        {user ? (
          <>
            <Button
              color="inherit"
              onClick={() => navigate("/upload")}
              disabled={!user} // Disable upload button if no user
            >
              Upload
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;