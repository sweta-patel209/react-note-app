import express, {Request, Response} from "express";
import noteRouter from './routes/noteRouter';
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors())

app.listen(5000, ()=> {
    console.log("server is running on 5000")
})

app.get("/api/notes",async(req:Request,res:Response)=>{
    res.json({message:"success"})
})

app.use("/api/notes",noteRouter);
