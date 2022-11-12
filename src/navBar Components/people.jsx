import { Card, CardContent, InputLabel, MenuItem, Pagination, Select, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

import '/home/user/Downloads/react-assignments/swapitask/src/style.css'

export default function People() {
  const navigateTo = useNavigate()
  const [peopleData, setPeopleData] = useState({})
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
    axios.get(`https://swapi.dev/api/people/?page=${pageNo}`)
      .then((success) => {
        setPeopleData(success.data)
        setLoader(false)
      })
      .catch((failed) => console.log('errorMsg ', failed))
  }

  const redirectTo = (name) => {
    navigateTo(`peopledetails/${name}/${pageNo}`)
  }

  useEffect(() => {
    loadData()
  }, [pageNo])

  return (
    <div>
      <center>
        <Toolbar id="toolBar">
          <Pagination
            count={Math.ceil((parseInt(peopleData.count) / 10))}
            onChange={ChangePage}
            page={pageNo}
            sx={{ ml: '65%', mt: '60px' }} />

          <InputLabel sx={{ mt: '60px' }}>Jump To</InputLabel>
          <Select sx={{ width: "100px", mt: '60px' }}
            value={pageNo}
            onChange={handlePageChange}>
            {
              peopleData.count && new Array(Math.ceil(peopleData.count / 10)).fill(0).map((item, index) =>
                (<MenuItem value={index + 1} key={index}>{index + 1}</MenuItem>))
            }
          </Select>
        </Toolbar>


        {
          (loader) ? <Loader load={loader} /> :
            (peopleData.results)?.map((element, index) => {
              return (
                <div key={index}>
                  <Card
                    sx={{ mt: '1%', width: '15%', border: 'solid', borderColor: 'black', cursor: 'pointer' }}
                    onClick={() => redirectTo(element.name)}>
                    <CardContent>Name : {element.name}</CardContent>
                    <CardContent>Gender : {element.gender}</CardContent>
                    <CardContent>Birth Year : {element.birth_year}</CardContent>
                  </Card> <br />
                </div>
              )
            })
        }
      </center>

    </div>
  )
}
