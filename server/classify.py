# This server performs diabetic retinpathy classification and has generative ai integration which helps us in providing further insights regarding the retinal images

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS 
from werkzeug.utils import secure_filename
import os
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/classify": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 
tf_model = tf.keras.models.load_model('keras_model.h5')

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY') ,
)


@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    img = request.files['image']
    if img.filename == '':
        return jsonify({'error': 'No selected file'})

    filename = secure_filename(img.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img.save(filepath)

    image = Image.open(filepath).resize((224, 224), Image.Resampling.LANCZOS)
    image_array = np.asarray(image).astype(np.float32) / 127.0 - 1
    prediction = tf_model.predict(np.expand_dims(image_array, axis=0))
    pred_new = prediction[0]
    categories = ["No DR", "Mild", "Moderate", "Severe", "Proliferative"]
    index = np.argmax(pred_new)
    classification = categories[index]
    confidence = round(pred_new[index] * 100, 2)

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert ophthalmologist who is given the category of diabetic retinopathy detected and confidence level, you have to return the most likely other diseases in bullets (None in case no diabetic retinopathy detected), and three most effective technical treatments in bullets in plain text (no bold)."},
                {"role": "user", "content": f"Category: {classification}, Confidence: {confidence}"},
            ]
        )
        insights = response.choices[0].message.content
    except Exception as e:
        return jsonify({'error': str(e), 'classification': classification, 'confidence': confidence})

    return jsonify({
        'classification': classification,
        'confidence': confidence,
        'insights': insights
    })

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True, port=8080)

