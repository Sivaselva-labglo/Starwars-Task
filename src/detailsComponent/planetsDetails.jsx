import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function Planetdetails() {
  const [planetsData, setPlanetsData] = useState({})
  const [loader, setLoader] = useState(false)
  const { name, pageNo } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/planets/?page=${pageNo}`)
      .then((success) => {
        setPlanetsData(success.data)
        setLoader(false)
      })
      .catch((failed) => console.log('errorMsg ', failed))
  }

  useEffect(() => {
    loadData()
  },[])

  return (
    <div>
      <center>
        {
          (loader) ? <CircularProgress sx={{ mt: '20%', color: 'white' }} /> :
            (planetsData.results)?.filter((item) => item.name === name).map((element) => {
              return (
                <Card sx={{ mt: '50px', height: '1200px', color: 'black', opacity: '0.5' }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }}>Name : {element.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Rotation_period : {element.rotation_period}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Orbital_period : {element.orbital_period}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Diameter : {element.diameter}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Climate : {element.climate}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Gravity : {element.gravity}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Terrain : {element.terrain}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Surface_water : {element.surface_water}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Population : {element.population}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Films :  {element.films?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Residents : {element.residents?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Url : <a href={element.url}>{element.url}</a> </Typography>
                  </CardContent>
                </Card>
              )
            })
        }
      </center>
    </div>
  )
}