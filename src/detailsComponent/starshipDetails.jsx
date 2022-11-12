import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function Starshipdetails() {
  const [starshipData, setStarshipData] = useState({})
  const [loader, setLoader] = useState(false)
  const { shipname, pageNo } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/starships/?page=${pageNo}`)
      .then((success) => {
        setStarshipData(success.data)
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
            <div>
              {
                (starshipData.results)?.filter((item) => item.name === shipname).map((elements) => {
                  return (
                    <Card sx={{ mt: '50px', height: '1200px', color: 'black', opacity: '0.5' }} >
                      <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }}>Name : {elements.name}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Model : {elements.model}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Manufacturer : {elements.manufacturer}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Cargo_capacity :{elements.cargo_capacity}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Passangers : {elements.passangers}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Startship_class : {elements.startship_class}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Consumables : {elements.consumables}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Length : {elements.length}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Crew : {elements.crew}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Hyperdrive_rating : {elements.hyperdrive_rating}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Cost_in_credits : {elements.cost_in_credits}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Max_atmosphering_speed :{elements.max_atmosphering_speed}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Pilots : {elements.pilots?.map((element) =>
                          <p> <a href={element}>{element}</a></p>)}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Films : {elements.films?.map((element) =>
                          <p> <a href={element}>{element}</a> </p>)}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                })
              }
            </div>
        }
      </center>
    </div>
  )
}


