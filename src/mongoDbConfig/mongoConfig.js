import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
export const connect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://duythanh318:CaqougtuEbFwSUt2@chat-app.x13bb1s.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        wtimeoutMS: 10000,
      }
    )
    .then(() => console.log("Connect DB success"))
    .catch((e) => console.log(e))
    .finally(() => {});
};
// autoIncrement.initialize(mongoose.connection);
