import { Card, CardContent, InputLabel, MenuItem, Pagination, Select, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function Planets() {
  const navigateTo = useNavigate()
  const [planetsData, setPlanetsData] = useState({})
  const [loader, setLoader] = useState(false)
  const [pageNo, setPageNo] = useState(1)

  const ChangePage = (event, value) => {
    setPageNo(value);
  };
  const handlePageChange = (event) => {
    setPageNo(event.target.value)
  }
  function loadData() {
    setLoader(true)
    axios.get(`https://swapi.dev/api/planets/?page=${pageNo}`)
      .then((success) => {
        setPlanetsData(success.data)
        setLoader(false)
      })
      .catch((failed) => console.log('errorMsg ', failed))
  }

  const redirectTo = (name) => {
    console.log('Name ', name)
    navigateTo(`planetdetails/${name}/${pageNo}`)
  }

  useEffect(() => {
    loadData()
  }, [pageNo])

  return (
    <div>
      <Toolbar id="toolBar">
        <Pagination count={Math.ceil((parseInt(planetsData.count) / 10))} onChange={ChangePage} page={pageNo} sx={{ ml: '70%', mt: '60px' }} />
        <InputLabel sx={{ mt: '60px' }}>Jump To</InputLabel>
        <Select sx={{ width: "100px", mt: '60px' }}
          value={pageNo}
          onChange={handlePageChange}>
          {
            planetsData.count && new Array(Math.ceil(planetsData.count / 10)).fill(0).map((item, index) => (<MenuItem value={index + 1}>{index + 1}</MenuItem>))
          }
        </Select>
      </Toolbar>
      <center>

        {
          (loader) ? <Loader load={loader} /> :
            (planetsData.results)?.map((element, index) => {
              return (
                <div key={index}>
                  <Card sx={{ mt: '1%', width: '15%', border: 'solid', borderColor: 'black', cursor: 'pointer' }} onClick={() => redirectTo(element.name)}>
                    <CardContent>Name : {element.name}</CardContent>
                    <CardContent>Climate : {element.climate}</CardContent>
                    <CardContent>Population : {element.population}</CardContent>
                  </Card> <br />
                </div>
              )
            })
        }
      </center>
    </div>
  )
}