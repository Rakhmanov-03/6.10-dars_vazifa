import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

function validate() {
  if (username === "") {
    alert("Ism kiritilishi zarur");
    document.getElementById("name").focus();
    return;
  } else if (username.length < 3) {
    alert("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    document.getElementById("name").focus();
    return;
  }

  if (email === "") {
    alert("Ism kiritilishi zarur");
    document.getElementById("name").focus();
    return;
  } else if (email.length < 3) {
    alert("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    document.getElementById("name").focus();
    return;
  }
  if (password === "") {
    alert("Ism kiritilishi zarur");
    document.getElementById("name").focus();
    return;
  } else if (password.length < 3) {
    alert("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    document.getElementById("name").focus();
    return;
  }

  return true;
}

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const username = useRef();
  const email = useRef();
  const password = useRef();

  function handleClick(e) {
    e.preventDefault();
    setIsLoading(true);

    const isValid = validate();

    if (isValid) {
      const user = {
        username: username.current.value,
        email: username.current.value,
        password: username.current.value,
      };

      fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      then((res) => {
        console.log("result from backend", res);
        setIsLoading(false);
        if (res.status >= 200 && res.status <= 300) {
          return res.json();
        }
      })
        .then((data) => {
          console.log("data", data);
          if (data && data.message == "User regstered successfully") {
            console.log("succes ");
          }

          if (data && data.message == "Failed! Username is aleady in use!") {
            console.log("failed");
          }

          if (data && data.message == "Failed! Username is aleady in use!") {
            handleClickOpen();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <Container>
      <Box>
        <Typography variant="h3" textAlign={"center"} gutterBottom>
          Register page
        </Typography>
        <Box sx={{ mx: "auto", width: 500 }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            inputRef={username}
          />
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mt: "1rem" }}
            inputRef={email}
          />
          <TextField
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ mt: "1rem" }}
            inputRef={password}
          />
          <Button
            disabled={isLoading ? true : false}
            onClick={handleClick}
            variant="contained"
            fullWidth
            sx={{ mt: "1rem" }}
          >
            {isLoading ? "Loading..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
