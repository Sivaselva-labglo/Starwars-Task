import { AppBar, Toolbar, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css"

export default function Navbar() {
  const navigateTo = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState('')

  const navigate = (name) => {
    navigateTo(`/${name}`)
  }

  const getButtonColor = () => {
    const path = location.pathname
    console.log('path ', path)
    switch (path) {
      case "/people":
        setActive("people")
        break
      case "/planets":
        setActive("planets")
        break
      case "/starships":
        setActive("starships")
        break
      case "/films":
        setActive("films")
        break
      case "/species":
        setActive("species")
        break
      case "/vehicles":
        setActive("vehicles")
        break
      default :
      setActive(" ")
      break
    }
  }
  
  useEffect(() => getButtonColor())

  return (
    <AppBar sx={{ height: '60px', width: '100%' }}>
      <Toolbar>
        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('people')}
          className={active === 'people' ? "navButton" : ""}>People</Typography>

        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('planets')}
          className={active === 'planets' ? "navButton" : ""}>Planets</Typography>

        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('starships')}
          className={active === 'starships' ? "navButton" : ""}>Starships</Typography>

        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('films')}
          className={active === 'films' ? "navButton" : ""}>Films</Typography>

        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('species')}
          className={active === 'species' ? "navButton" : ""}>Species</Typography>
          
        <Typography sx={{ ml: '10%', ":hover" : {cursor : 'pointer'} }} onClick={() => navigate('vehicles')}
          className={active === 'vehicles' ? "navButton" : ""}>Vehicles</Typography>
      </Toolbar>
    </AppBar>
  )
}