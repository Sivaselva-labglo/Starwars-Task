import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function Speciesdetails() {
  const [speciesData, setSpeciesData] = useState({})
  const [loader, setLoader] = useState(false)
  const { name, pageNo } = useParams()

  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/species/?page=${pageNo}`)
      .then((success) => {
        setSpeciesData(success.data)
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
            (speciesData.results)?.filter((item) => item.name === name).map((element) => {
              return (
                <Card sx={{ mt: '50px', height: '1200px', color: 'black', opacity: '0.5' }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }}>Name : {element.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Classification : {element.classification}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Designation : {element.designation}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Average_height : {element.average_height}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Skin_colors : {element.skin_colors}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Hair_colors : {element.hair_colors}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Hair_colors : {element.hair_colors}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Hair_colors : {element.hair_colors}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Eye_colors : {element.eye_colors}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Language : {element.language}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Homeworld : <a href={element.homeworld}>{element.homeworld}</a> </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>People : {element.people?.map((element) =>
                      <p> <a href={element}>{element}</a> </p>)}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Films : {element.films?.map((element) =>
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


