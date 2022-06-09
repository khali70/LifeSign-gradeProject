import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

export const setupTensorFlow = async () => await tf.ready();
export const loadAIModel = async () => {
  const json_model = require("../assets/model.json");
  const bin_model = require("../assets/group1-shard1of1.bin");
  try {
    // const url =
    //   'https://raw.githubusercontent.com/khali70/model/main/model.json';
    const model = await tf.loadLayersModel(
      bundleResourceIO(json_model, bin_model)
    );
    return model;
  } catch (err) {
    throw err;
  }
};
/**
 * given string and the shape of the data the fun return perdition
 */
export const AiPredict = async (
  model: tf.LayersModel,
  dataArr: number[],
  shape: [number, number] = [1, 10]
) => {
  try {
    const prediction = model.predict(
      tf.tensor2d(dataArr, shape)
    ) as tf.Tensor<tf.Rank>;
    const value = Array.from(prediction.dataSync()).map(Math.round);
    const index = value.indexOf(Math.max(...value));
    const map = {
      3: "0", // 0001
      0: "1", // 1000
      2: "2", // 0010
      1: "3", // 0100
    };
    console.log(value.join(" "));
    //@ts-ignore
    return map[index.toString()];
  } catch (err) {
    if (err) console.error(err);
    console.error(`can't predict value`);
    return "4";
  }
};

export const AiHttpPredict = async (signal: string) => {
  try {
    // const url = 'https://grade-project-ai-backend.herokuapp.com/'
    const url = "http://localhost:3000/";
    for (let i = 0; i < 1; i++) {
      console.log("cd /home/khali/Downloads/AI/ && node index.js");
      console.log("adb reverse tcp:8081 tcp:8081");
    }
    const aiPredictionResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        data: signal,
      }),
    });
    const prediction = (await aiPredictionResponse.json()) as {
      res: string;
      error?: string;
    };
    if (prediction?.error) throw new Error(prediction.error);
    else return prediction.res.toString();
  } catch (err) {
    if (console?.tron) console.tron.error(new Error(err));
    else console.error(new Error(err));

    return "4";
  }
};
