const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config(); // Load environment variables

// Configure AWS SDK v3
const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient); // Simplified Document Client

const TABLE_NAME = process.env.TABLE_NAME;

class ItemModel {
  static async createItem(id, name) {
    const params = {
      TableName: TABLE_NAME,
      Item: { id, name },
    };
    return dynamoDB.send(new PutCommand(params));
  }

  static async getItem(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamoDB.send(new GetCommand(params));
  }

  static async updateItem(id, newName) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "set #name = :newName",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: { ":newName": newName },
      ReturnValues: "UPDATED_NEW",
    };
    return dynamoDB.send(new UpdateCommand(params));
  }

  static async deleteItem(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamoDB.send(new DeleteCommand(params));
  }
}

module.exports = ItemModel;
