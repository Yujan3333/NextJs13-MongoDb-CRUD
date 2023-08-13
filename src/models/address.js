import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    name:String,
    address:String,
    email:String,
    phone:String,
  },
  {
    timestamps: true,
  },
)
  
mongoose.models ={};

const Address = mongoose.models.personaldetails || mongoose.model("personaldetails", addressSchema);
// const Address = mongoose.model("personaldetails", addressSchema);

export default Address;
