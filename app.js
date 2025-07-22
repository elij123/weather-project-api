import express from "express"
import {query,validationResult} from "express-validator"
import cors from "cors"

const app = express()
const port = process.env.port || 3001;

const options = {
    origin: "https://weather-project-w8gc.onrender.com",
    methods: "GET",
}

app.use(cors(options))

app.get("/weather/data",query(["lat","lon"]).notEmpty().isDecimal(), (req,res) =>{
    const result = validationResult(req)
    if (result.isEmpty()){
        const {lat,lon} = req.query
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.OPENWEATHER_API}&units=metric&lang=en`
        fetch(url).then(result => {return result.json()}).then(response => res.send(response)).catch(error => console.log(error))
    }
    else{
        res.status(400).send({ errors: result.array() });
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`))