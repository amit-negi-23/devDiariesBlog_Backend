import { Label } from "../schemas/labelSchema.js";

const createNewLabel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedLabel = await Label.findOne({
        name: data.name,
      });
      if (existedLabel && existedLabel.name === data.name) {
        throw new Error("Label already exists");
      } else {
        const label = new Label(data);

        const newLabel = await label.save();
        resolve(newLabel);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getLabel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allLabels = await Label.find();
      resolve(allLabels);
    } catch (error) {
      reject(error);
    }
  });
};

const getLabelsByName=(data)=>{
  return new Promise(async(resolve,reject)=>{
    try{
      const regex = new RegExp(`^${data.name}`, 'i');

      const existedLabels = await Label.find({
        name: { $regex: regex },
        });
      if (existedLabels.length ===0) {
        throw new Error("Label doesn't exists");
      } else {
        resolve(existedLabels);
       }
      }catch(error){
      reject(error);
    }
  })
}

export { createNewLabel, getLabel,getLabelsByName };
