import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import "/home/user/Downloads/react-assignments/swapitask/src/style.css"

export default function Filmdetails() {
  const [filmData, setFilmData] = useState({})
  const [loader, setLoader] = useState(false)
  const { id } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/films/${id}`)
      .then((success) => {
        setFilmData(success.data)
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

            <Card sx={{ mt: '50px', color: 'black', opacity: '0.5' }} >
              <CardContent>
                <Typography sx={{ fontWeight: 'bold' }}>Title : {filmData.title}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Director : {filmData.director}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Release_date : {filmData.release_date}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Producer : {filmData.producer}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Episode_id : {filmData.episode_id}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Opening_crawl : {filmData.opening_crawl}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Characters : {filmData.characters?.map((element) =>
                  <p> <a href={element}>{element}</a> </p>)}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Planets : {filmData.planets?.map((element) =>
                  <p> <a href={element}>{element}</a> </p>)}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Species : {filmData.species?.map((element) =>
                  <p> <a href={element}>{element}</a> </p>)}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Vehicles : {filmData.vehicles?.map((element) =>
                  <p> <a href={element}>{element}</a> </p>)}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Starships : {filmData.starships?.map((element) =>
                  <p> <a href={element}>{element}</a> </p>)}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Url : <a href={filmData.url}>{filmData.url}</a> </Typography>
              </CardContent>
            </Card>
        }
      </center>
    </div>
  )
}


