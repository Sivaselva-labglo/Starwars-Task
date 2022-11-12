import { Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function Films() {
  const navigateTo = useNavigate()
  const [filmData, setFilmData] = useState({})
  const [loader, setLoader] = useState(false)

  function loadData() {
    setLoader(true)
    axios.get('https://swapi.dev/api/films')
      .then((success) => {
        setFilmData(success.data)
        setLoader(false)
      })
      .catch((failed) => console.log('errorMsg ', failed))
  }

  const redirectTo = (id) => {
    console.log('Id ', id)
    navigateTo(`filmdetails/${id}`)
  }


  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>

      <center>
        <Box sx={{ mt: '4%' }}>
          <Loader load={loader} /></Box>
        {
          (filmData.results)?.map((element, index) => {
            return (
              <div key={index}>
                <Card
                  sx={{ mt: '70px', width: '15%', border: 'solid', borderColor: 'black', cursor: 'pointer' }}
                  onClick={() => redirectTo(index + 1)}>
                  <CardContent>Title : {element.title}</CardContent>
                  <CardContent>Director : {element.director}</CardContent>
                  <CardContent>Release_Date : {element.release_date}</CardContent>
                </Card> <br />
              </div>
            )
          })
        }
      </center>

    </div>
  )
}