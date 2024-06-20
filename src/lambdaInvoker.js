import { InvokeCommand } from "@aws-sdk/client-lambda";
import { lambdaClient } from "./lambdaClient";

const functionName = "lambda-letterboxd-diary"; // Replace with your Lambda function name

const invokeLambdaFunction = async (username) => {
  try {
    const params = {
      FunctionName: functionName,
      InvocationType: "RequestResponse", // Sync invocation
      Payload: JSON.stringify({ username }),
    };

    const data = await lambdaClient.send(new InvokeCommand(params));
    const decoder = new TextDecoder("utf-8");
    const decodedPayload = decoder.decode(data.Payload);
    const payload = JSON.parse(decodedPayload);
    console.log("Lambda invocation result:", payload);
    return payload;
  } catch (err) {
    console.error("Error invoking Lambda function:", err);
    throw err;
  }
};

export { invokeLambdaFunction };
