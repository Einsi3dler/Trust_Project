#!/bin/env python
from chat.v1.app import create_app, socketio

app = create_app(debug=True)

if __name__ == '__main__':
    socketio.run(app)
