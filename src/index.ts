import express from "express";
import router from "./routes/router";
import client from 'prom-client'
const app = express();
const PORT = process.env.PORT ?? 3001;

const defaultMetrices = client.collectDefaultMetrics

defaultMetrices({ register: client.register})

app.get('/metrices', async(req,res)=>{
    res.setHeader('Content-Type', client.register.contentType)
    const metrices = await client.register.metrics()
    res.send(metrices)
})

app.use("/", router);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT} 🎉`));
