
import express from "express";
import authrouter from "./auth/route";
import cors from "cors";
import cookieParser from "cookie-parser";
import vfstaffrouter from "./vf-staff/route";
import accstaffrouter from "./acc-staff/route";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://alumnicell-iitgoa.vercel.app"],
  })
);

app.use(cookieParser(process.env["COOKIE_SECRET"]));


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/auth", authrouter);
app.use("/vf-staff", vfstaffrouter);
app.use("/acc-staff", accstaffrouter);


app.listen(8000, () => {
  console.log(`server started at http://localhost:8000`);
});

export default app;

