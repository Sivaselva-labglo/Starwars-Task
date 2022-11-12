import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function Vehicledetails() {
  const [vehicleData, setVehiclesData] = useState({})
  const [loader, setLoader] = useState(false)
  const { vehiclename, pageNo } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/vehicles/?page=${pageNo}`)
      .then((success) => {
        setVehiclesData(success.data)
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
                (vehicleData.results)?.filter((item) => item.name === vehiclename).map((elements) => {
                  return (
                    <Card sx={{ mt: '50px', height: '1200px', color: 'black', opacity: '0.5' }}>
                      <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }}>Name : {elements.name}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Model : {elements.model}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Manufacturer : {elements.manufacturer}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Cargo_capacity :{elements.cargo_capacity}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Passangers : {elements.passengers}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Vehicle_class : {elements.vehicle_class}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Consumables : {elements.consumables}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Length : {elements.length}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Crew : {elements.crew}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Hyperdrive_rating : {elements.hyperdrive_rating}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Cost_in_credits : {elements.cost_in_credits}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Max_atmosphering_speed :{elements.max_atmosphering_speed}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Pilots : {elements.pilots?.map((element) =>
                          <p> <a href={element}>{element}</a> </p>)}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Films : {elements.films?.map((element) =>
                          <p> <a href={element}>{element}</a> </p>)}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Url : <a href={elements.url}>{elements.url}</a> </Typography>
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


