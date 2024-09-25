import mongoose from "mongoose";

const dbConnection = async () => {
  const url = process.env.DB_URL;
  const db_name = "devDiariesBlog_Backend";
  try {
    await mongoose.connect(
      `${url}/${db_name}`
      // {
      //  useNewUrlParser:true,
      //  useCreateIndex:true,
      // useUnifiedTopology:true,
      // useFindAndModify:false},
    );
    console.log("Connected to database successfully");
  } catch (e) {
    console.log(e);
    console.log("Can not connect to database");
  }
};
export default dbConnection;
