from flask import Flask, request, jsonify, render_template, redirect, session
from flask_cors import CORS
import random
import sqldb

app = Flask(__name__, static_folder="../frontend/build")

CORS(app)

app.config.update(SECRET_KEY='NOT_A_VERY_SECRET_KEY',
                  ENV='development')

player_choices = ["rock", "paper", "scissors"]


def random_handShape():
    machine_player_choice = random.randint(0, 2)
    return f"Computer chose {player_choices[machine_player_choice]}"


def calculate_winner(a, b):
    if a == b:
        return 'tie'
    elif (a - b + 3) % 3 == 1:
        return 'win'
    else:
        return 'loss'


@app.route("/player_name", methods=["GET", "POST"])
def player_name():
    conn = sqldb.engine.connect()
    name = request.form.to_dict()['playerName']
    # session["name"] = name # Session should work!
    query_user = sqldb.users.select().where(sqldb.users.c.username == name)
    result2 = conn.execute(query_user)
    results_as_dict = result2.mappings().all()    

    if not results_as_dict:
        ins = sqldb.users.insert().values(username = name)
        print("Inserting new user:", ins)   
        print(ins.compile().params)
        result = conn.execute(ins)    
    return ('', 200)


@app.route("/is2player", methods=["GET", "POST"])
def is2player():
    conn = sqldb.engine.connect()
    test_output = request.form.to_dict()
    if request.form.to_dict()['isTwoPlayer']:
        create_new_player = 'make that a function'
    else:
        random_handShape()
    print("THIS IS test_output: ", test_output)
    # if true, go back to player_name
    return jsonify(request.form.to_dict())


@app.route("/playgame", methods=["GET", "POST"])
def playgame():
    test_output = request.form.to_dict()
    print("THIS IS test_output: ", test_output)
    print("THIS IS  session later",  session)   
    if request.form.to_dict()["handShape"] == "rock":
        a = 0
    elif request.form.to_dict()["handShape"] == "paper":
        a = 1
    elif request.form.to_dict()["handShape"] == "scissors":
        a = 2
    outcome = calculate_winner(a, 0)
    if outcome == 'tie':
        x = 1 # WHERE CLAUSE BELOW CAUSING CRASH WITH OperationalError: no such column -- but the column was there!
        # set_to_inactive = sqldb.users.update().values(active_as = None).where(sqldb.users.c.active_as == "player1")
    return [a]  # jsonify(request.form.to_dict())

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
