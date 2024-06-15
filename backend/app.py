import sqlite3

def create_connection():
    conn = sqlite3.connect('users.db')
    return conn

def initialize_database():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        isActive BOOLEAN NOT NULL
    )''')
    conn.commit()
    conn.close()

def create_user():
    user_data = {}
    user_data['id'] = int(input("Enter user ID: "))
    user_data['firstName'] = input("Enter user First Name: ")
    user_data['lastName'] = input("Enter user Last Name: ")
    user_data['email'] = input("Enter user email: ")
    user_data['role'] = input("Enter user role: ")
    user_data['isActive'] = input("Is user active? (True/False): ").lower() == 'true'
    return user_data

def save_user_to_db(user_data):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (id, firstName, lastName, email, role, isActive) VALUES (?, ?, ?, ?, ?, ?)',
                   (user_data['id'], user_data['firstName'], user_data['lastName'], user_data['email'], user_data['role'], user_data['isActive']))
    conn.commit()
    conn.close()

def update_user_in_db(user_id, new_name, new_email):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE users SET name = ?, email = ? WHERE id = ?',
                   (new_name, new_email, user_id))
    conn.commit()
    conn.close()

def delete_user_from_db(user_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()

def list_users():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    for user in users:
        print(f"ID: {user[0]}, Name: {user[1]}, Email: {user[2]}, Active: {user[3]}")
    conn.close()

def find_users_by_name(search_string):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE name LIKE ?', ('%' + search_string + '%',))
    users = cursor.fetchall()
    for user in users:
        print(f"ID: {user[0]}, Name: {user[1]}, Email: {user[2]}, Active: {user[3]}")
    conn.close()

def main():
    initialize_database()

    while True:
        choice = input('''Select one of the following options:
        1. Create User
        2. Update User
        3. Delete User
        4. List Users
        5. Find Users by Name
        6. Exit
        Enter your choice: ''')

        if choice == '1':
            user_data = create_user()
            save_user_to_db(user_data)
            print("User data has been saved.")

        elif choice == '2':
            user_id = int(input("Enter user ID to update: "))
            new_name = input("Enter new name: ")
            new_email = input("Enter new email: ")
            update_user_in_db(user_id, new_name, new_email)
            print("User updated successfully.")

        elif choice == '3':
            user_id = int(input("Enter user ID to delete: "))
            delete_user_from_db(user_id)
            print("User deleted successfully.")

        elif choice == '4':
            print("List of Users:")
            list_users()

        elif choice == '5':
            search_string = input("Enter the name to search: ")
            find_users_by_name(search_string)

        elif choice == '6':
            print("Exiting the program.")
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
