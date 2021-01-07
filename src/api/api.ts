import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import express from "express";
import cors  from "cors";
import http from "serverless-http";
import parser from "body-parser";

import { routes } from "../routes";

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));

// parse application/json
app.use(parser.json());

routes(app);

const _handler = http(app);

export const handler = async function(
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) {
  const result = await _handler(event, context)

  return result
}
