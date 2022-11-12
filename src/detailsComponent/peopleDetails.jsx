import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function Peopledetails() {
  const [peopleData, setPeopleData] = useState({})
  const [loader, setLoader] = useState(false)
  const { name, pageNo } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/people/?page=${pageNo}`)
      .then((success) => {
        setPeopleData(success.data)
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
        {(loader) ? <CircularProgress sx={{ mt: '20%', color: 'white' }} /> :
          (peopleData.results)?.filter((item) => item.name === name).map((element) => {
            return (
              <div>
                <Card sx={{ mt: '50px', height: '1200px', color: 'black', opacity: '0.5' }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }}>Name : {element.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Height : {element.height}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Mass : {element.mass}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Hair_color : {element.hair_color}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Skin_color : {element.skin_color}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Eye_color : {element.eye_color}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Birth_year : {element.birth_year}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Gender : {element.gender}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Homeworld :
                      <a href={element.homeworld}>{element.homeworld}</a>
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Films : {element.films?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Species : {element.species?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Vehicles : {element.vehicles?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Starships : {element.starships?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Url :
                      <a href={element.url}> {element.url} </a>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )
          })
        }
      </center>
    </div>
  )
}


