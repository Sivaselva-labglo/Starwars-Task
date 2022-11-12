import { Card, CardContent, InputLabel, MenuItem, Pagination, Select, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function Vehicles() {
  const navigateTo = useNavigate()
  const [vehiclesData, setVehiclesData] = useState({})
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
    axios.get(`https://swapi.dev/api/vehicles/?page=${pageNo}`)
      .then((success) => {
        setVehiclesData(success.data)
        setLoader(false)
      })
      .catch((failed) => console.log('errorMsg ', failed))
  }

  const redirectTo = (vehiclename) => {
    navigateTo(`vehicledetails/${vehiclename}/${pageNo}`)
  }

  useEffect(() => {
    loadData()
  }, [pageNo])

  return (
    <div>
      <Toolbar id="toolBar">
        <Pagination
          count={Math.ceil((parseInt(vehiclesData.count) / 10))}
          onChange={ChangePage}
          page={pageNo}
          sx={{ ml: '70%', mt: '60px' }} />

        <InputLabel sx={{ mt: '60px' }}>Jump To</InputLabel>
        <Select sx={{ width: "100px", mt: '60px' }}
          value={pageNo}
          onChange={handlePageChange}>
          {
            vehiclesData.count && new Array(Math.ceil(vehiclesData.count / 10)).fill(0).map((item, index) =>
              (<MenuItem value={index + 1}>{index + 1}</MenuItem>))
          }
        </Select>
      </Toolbar>
      <center>

        {
          (loader) ? <Loader load={loader} /> :
            (vehiclesData.results)?.map((element, index) => {
              return (
                <div key={index}>
                  <Card
                    sx={{ mt: '1%', width: '15%', border: 'solid', borderColor: 'black', cursor: 'pointer' }}
                    onClick={() => redirectTo(element.name)}>
                    <CardContent>Name : {element.name}</CardContent>
                    <CardContent>Model : {element.model}</CardContent>
                    <CardContent>Manufacturer : {element.manufacturer}</CardContent>
                  </Card> <br />
                </div>
              )
            })
        }
      </center>
    </div>
  )
}