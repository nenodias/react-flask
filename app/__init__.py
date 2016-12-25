# -*- coding:utf-8 -*-
import os
from flask import Flask, render_template

app = Flask(__name__)

static_folder_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

@app.route('/', defaults={'value':None})
@app.route('/<path:value>')
def index(value):
    return render_template('index.html')

@app.route('/jsx/<path:jsx>')
def jsx(jsx):
    jsx += 'x'
    complete_path = os.path.join(static_folder_root, 'app', jsx)
    #print(complete_path)
    with open(complete_path) as file:
        from react import jsx
        transformer = jsx.JSXTransformer()
        js = transformer.transform_string(file.read())
        return js
    return '', 404

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
