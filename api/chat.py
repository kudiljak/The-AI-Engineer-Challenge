import json
import os
from openai import OpenAI

def handler(request):
    # Parse request body
    try:
        if hasattr(request, 'body'):
            body = json.loads(request.body) if isinstance(request.body, str) else request.body
        else:
            body = request.get_json() if hasattr(request, 'get_json') else {}
    except:
        body = {}
    
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    # Handle POST request
    if request.method == 'POST':
        try:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    'body': json.dumps({"detail": "OPENAI_API_KEY not configured"})
                }
            
            user_message = body.get("message", "") if isinstance(body, dict) else ""
            
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a supportive mental coach."},
                    {"role": "user", "content": user_message}
                ]
            )
            
            reply = response.choices[0].message.content
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({"reply": reply})
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({"detail": f"Error: {str(e)}"})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({"detail": "Method not allowed"})
    }
