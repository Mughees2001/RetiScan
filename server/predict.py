# This server performs retinal vessel segmentation, abnormality testing , and supports the chatbot
from flask import Flask, jsonify,  request, send_file
from werkzeug.utils import secure_filename
import os
from inference import process_image
from flask_cors import CORS
import base64
from openai import OpenAI
import requests

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY') ,
)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/api/abnormal', methods=['POST'])
def abnormal():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        base64_image = encode_image(filepath)
        api_key= os.getenv('OPENAI_API_KEY')
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "I want a non-professional prediction of the appearance of this retinal image. Could you describe any noticeable features, discoloration or irregularities in the image? Based on these observations, would you say the image appears more normal or abnormal? I understand this is not a medical assessment and is for informational purposes only."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        if response.status_code == 200:
            print(response.json())
            return jsonify(response.json()), 200
        else:
            return jsonify({'error': 'Error processing the image'}), 500
    return jsonify({'error': 'File is not present or not allowed'}), 400


@app.route('/api/send-message', methods=['POST'])
def chat():
    data = request.json
    user_message = data['text']
    print(user_message)

    # OpenAI Call
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert opthamologist who gives advice related to retinal and eye diseases and procedures only."},
                {"role": "user", "content": user_message},
            ]
        )
        response_text = response.choices[0].message.content
        print(response_text)
        return jsonify({'response': response_text})
        
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)})


@app.route('/predict', methods=['POST'])
def predict():
   
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    result_path = process_image(filepath)
    
    return send_file(result_path, mimetype='image/png')

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)

