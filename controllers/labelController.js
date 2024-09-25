import {
  createNewLabel,
  getLabel,
  getLabelsByName,
} from "../repository/labelRepository.js";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

const createLabel = async (req, res) => {
  try {
    let data = req.body;
  if(data.name.charAt(0)==='_'){
    throw new Error("Label can't start from underscore")
  }
    let name = data.name.toLowerCase().replaceAll(" ", "");
    data.name=name;
    let result = await createNewLabel(data);

    return res
      .status(201)
      .send(apiResponseSuccess(result, true, 201, "Label created successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getAllLabel = async (req, res) => {
  try {
    const result = await getLabel();
    return res
      .status(200)
      .send(
        apiResponseSuccess(result, true, 200, "Getting all labels successfully")
      );
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getLabelByName = async (req, res) => {
  try {
    let data = req.body;
    let name = data.name.replaceAll(" ", "");
     data.name=name;

    let result = await getLabelsByName(data);
    return res
      .status(200)
      .send(
        apiResponseSuccess(
          result,
          true,
          200,
          "Getting labels by name successfully"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

export { createLabel, getAllLabel, getLabelByName };
