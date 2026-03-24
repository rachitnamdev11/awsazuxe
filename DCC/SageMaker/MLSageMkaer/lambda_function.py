import json
import boto3

runtime = boto3.client("sagemaker-runtime")

ENDPOINT_NAME = "sagemaker-scikit-learn-2026-03-23-22-20-42-610"  # 🔥 change this

def lambda_handler(event, context):
    try:
        # Parse request
        if "body" in event:
            body = json.loads(event["body"])
        else:
            body = event

        data = body.get("input")

        # Call SageMaker endpoint
        response = runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType="application/json",
            Body=json.dumps(data)
        )

        result = response["Body"].read().decode()

        return {
            "statusCode": 200,
            "body": result
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": str(e)
        }