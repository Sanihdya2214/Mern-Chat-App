import mongoose from "mongoose"

const connectMongodb = async () => {
      try {
        await mongoose.connect(process.env.MONGO_DB_URI)
          console.log("Conected To MongoDb")
      } catch (error) {
         console.log("Error connecting with mongodb",error.message)
      }
}
 
export default connectMongodb;