import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import { fileURLToPath } from "url"; // Use fileURLToPath instead of fileURLPath
import path from "path";
import helmet from "helmet"; // Import the 'helmet' package
import dotenv from "dotenv"; // Import the 'dotenv' package
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import {verifyToken} from "./middleware/auth.js";
import User from "./models/User.js"
import Post from "./models/Post.js"
import {users,posts} from "./data/index.js"
// CONFIGURATION //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // Add a slash before 'assets'

// file storage //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/assets")); // Use an absolute path for destination
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
// routes with files
app.post("/auth/resgister",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);
// Routes
app.use("auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);


// Mongoose setup //
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 Server port: ${PORT}`));
    // add data one time 
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));
