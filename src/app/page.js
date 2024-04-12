"use client"
import { useEffect, useState } from "react";
import { List, ListItem, Grid, 
  Typography, Autocomplete, TextField,
  CssBaseline} from "@mui/material";
import { create } from "zustand";

const useStore = create((set) => ({
  banks : [
    {
      "description": "Banco Paga Todo es Para Todos",
      "age": 10,
      "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-pagatodo.jpeg?alt=media&token=38b6ac4d-85ac-4288-bada-88eb5a0dec20",
      "bankName": "Paga Todo"
    },
    {
      "description": "BBVA Bancomer Creando Oportunidades",
      "bankName": "BBVA Bancomer",
      "age": 11,
      "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-bbva.jpeg?alt=media&token=435ed70e-061b-4a80-a216-c69cea04f068"
    },
    {
      "description": "Scotiabank Creando Tú decides, Nosotros te Asesoramos",
      "bankName": "Scotiabank México",
      "age": 9,
      "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo.scotiabank.jpg?alt=media&token=1029cc0b-7bff-4f5c-90f7-d96ca60f9619"
    },
    {
      "description": "Citibanamex, lo mejor de México, lo mejor del mundo.",
      "bankName": "Citibanamex",
      "age": 7,
      "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-citi.png?alt=media&token=da97f3ad-34b2-4f7d-ae59-3169238993c7"
    },
    {
      "description": "Banregio: Somos el banco de creadores",
      "bankName": "Banregio",
      "age": 5,
      "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-banregio.png?alt=media&token=ae605bda-5698-4bf8-9639-d4fdc9579b5c"
    }
  ],

}))



export default function Home() {

  const [bancos, setBancos] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {banks} = useStore()
  

  useEffect(() => {
     fetch('https://mypymes-dot-avbulkmiddlewarepoc-dot-bsuite-qa.wl.r.appspot.com/numerotelmex?cvegeo=3105000010366007', {
          method: 'GET', // or 'POST', 'PUT', etc.
          headers: {
            'Content-Type': 'application/json', // Modify headers as needed
            // Add any other headers required by the server
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            // set the state of the data but there is permission of cors block to 
            // localhost:3000 and 3001 so 
            //setBancos(data);
            console.log(data)
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
  },[bancos])

  return (
    <main className=" min-h-screen flex-col items-center justify-around p-10">
      <div className="z-10 max-w-5xl w-full flex-row items-center justify-between font-mono text-sm lg:flex">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue">Test consume API</h1>
        <div className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-blue">
          <h3>Jorge Ignacio Salia</h3>
        </div>
      </div>
      <Autocomplete
        disablePortal
        id="banks-combo"
        options={banks}
        className="w-40 md:w-32 lg:w-48"
        getOptionLabel={(option) => option.bankName}
        renderInput={(params) => <TextField {...params} label="Bank" />}
      />
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={3}>
          <Typography variant="h6">Name</Typography>
        </Grid>
        <Grid item xs={3} className="hidden sm:block">
        <Typography variant="h6">Age</Typography>
        </Grid>
        <Grid item xs={3} className="hidden md:block" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
        <Typography variant="h6">Site</Typography>
        </Grid>
        <Grid item xs={3} className="hidden md:block">
        <Typography variant="h6">Description</Typography>
        </Grid>
      </Grid>
      <hr />
      <List className="" >
        {
          banks.length > 0 ? 
          banks.map((item, index) =>(
            <ListItem key={index}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={3}>
                  {item.bankName}</Grid>
                <Grid item xs={3} className="hidden sm:block">{item.age}</Grid>
                <Grid item xs={3} className="hidden md:block" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.url}</Grid>
                <Grid item xs={3} className="hidden md:block">{item.description}</Grid>
              </Grid>
            </ListItem>
          ))
          :<></>
        }
      </List>
    </main>
  );
}
