from flask import Flask, render_template
from flask_cors import CORS  # added CORS import
from .api.api import api

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # updated CORS config for API endpoints
app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)