import { useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const detectFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: detectFace.left_col * width,
      topRow: detectFace.top_row * height,
      rightCol: width - detectFace.right_col * width,
      bottomRow: height - detectFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    setImgUrl(input);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((user) => {
                return { ...user, entries: count };
              });
            });
        }
        displayFaceBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setInput("");
      setImgUrl("");
      setBox({});
      setRoute("signin");
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });

      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onPictureSubmit}
          />
          <FaceRecognition imgUrl={imgUrl} box={box} />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
