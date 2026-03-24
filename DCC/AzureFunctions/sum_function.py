import azure.functions as func
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    numbers = req.get_json().get("numbers", [])
    result = sum(numbers)
    return func.HttpResponse(json.dumps({"sum": result}), mimetype="application/json")
