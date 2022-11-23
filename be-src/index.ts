import * as express from "express";
import * as path from "path";

const app = express();
const port = process.env.PORT || 3000;
const staticDirPath = path.resolve(__dirname, "../fe-dist");
app.use(
  express.json({
    limit: "50mb",
  })
);


app.post("/auth",(req,res)=>{
  
})


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(express.static(staticDirPath));
app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});
