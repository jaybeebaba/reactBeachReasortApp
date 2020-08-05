import React from 'react';
import './App.css';

import Home from "./pages/Home"
import Error from "./pages/Error"
import Rooms from "./pages/Rooms"
import SingleRoom from "./pages/SingleRoom"


import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navbar from "./components/Navbar"
import { RoomProvider } from "./context"

function App() {
  return (
    
      <BrowserRouter>
      <RoomProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  exact path="/rooms/" component={Rooms} />
          <Route path="/rooms/:slug" component={SingleRoom} />
          <Route component={Error} />
        </Switch>
        </RoomProvider>
      </BrowserRouter>
   
  );
}

export default App;
