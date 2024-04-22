import express from "express";
import authrouter from "./auth/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import vfstaffrouter from "./vf-staff/routes";
import accstaffrouter from "./acc-staff/routes";
import staffcommonrouter from "./staff-common/routes";
import adminrouter from "./admin/routes";
import razorpayrouter from "./payment/routes";

import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://alumnicell-iitgoa.vercel.app",
      "https://test-aa-frontend.iitgoa.ac.in",
    ],
  })
);

app.use(cookieParser(process.env["COOKIE_SECRET"]));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Alumni Association API",
      description: "API Documentation",
      version: "1.0.0", // Add this line
      contact: {
        name: "Rushikesh Pawar",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./api/**/*.ts"],
};

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/auth", authrouter);
app.use("/vf-staff", vfstaffrouter);
app.use("/acc-staff", accstaffrouter);
app.use("/staff-common", staffcommonrouter);
app.use("/admin", adminrouter);

// payment routes
app.use("/razorpay", razorpayrouter);

app.listen(8000, () => {
  console.log(`server started at http://localhost:8000`);
});

export default app;
