import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for all routes

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

# Define Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')

    user = db.relationship('User', backref=db.backref('tasks', lazy=True))

# Create database tables
def create_tables():
    with app.app_context():
        logger.info("Creating database tables if they do not exist.")
        db.create_all()
        logger.info("Database tables created.")

# Routes
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validate required fields
    required_fields = ['id', 'firstname', 'lastname', 'email', 'role', 'is_active']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Create new user in database
    new_user = User(
        id=int(data['id']),
        firstname=data['firstname'],
        lastname=data['lastname'],
        email=data['email'],
        role=data['role'],
        is_active=data['is_active']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    # Validate required fields
    required_fields = ['user_id', 'description', 'status']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Ensure user_id is an integer
    try:
        user_id = int(data['user_id'])
    except ValueError:
        return jsonify({'error': 'user_id must be an integer'}), 400

    new_task = Task(
        user_id=user_id,
        description=data['description'],
        status=data['status']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = [
        {
            'id': task.id,
            'user_id': task.user_id,
            'description': task.description,
            'status': task.status
        } for task in tasks
    ]
    return jsonify(result), 200

@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    task.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

if __name__ == '__main__':
    create_tables()  # Ensure tables are created before the app starts
    app.run(debug=True)
