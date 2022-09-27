from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import sqldb
from sqlalchemy import or_

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)

HAND_SHAPES = ["rock", "paper", "scissors"]


def get_stored_user_data(player1_name, player2_name):
    conn = sqldb.engine.connect()
    query_both_users = sqldb.users.select().where(
        or_(
            sqldb.users.c.username == player1_name,
            sqldb.users.c.username == player2_name,
        )
    )
    result = conn.execute(query_both_users)
    results_list = [r._asdict() for r in result.all()]
    return results_list


def update_scores(outcome, player1_data, player2_data):
    print(
        f"\n==============================update_scores called, {outcome}, {player1_data}, {player2_data}, \n"
    )
    conn = sqldb.engine.connect()
    if outcome == "tie":
        set_score = (
            sqldb.users.update()
            .values(ties=player1_data["ties"] + 1)
            .where(sqldb.users.c.username == player1_data["username"])
        )
        conn.execute(set_score)
        set_score = (
            sqldb.users.update()
            .values(ties=player2_data["ties"] + 1)
            .where(sqldb.users.c.username == player2_data["username"])
        )
        conn.execute(set_score)

    elif outcome == "win":
        set_score = (
            sqldb.users.update()
            .values(wins=player1_data["wins"] + 1)
            .where(sqldb.users.c.username == player1_data["username"])
        )
        conn.execute(set_score)
        set_score = (
            sqldb.users.update()
            .values(losses=player2_data["losses"] + 1)
            .where(sqldb.users.c.username == player2_data["username"])
        )
        conn.execute(set_score)

    elif outcome == "loss":
        set_score = (
            sqldb.users.update()
            .values(losses=player1_data["losses"] + 1)
            .where(sqldb.users.c.username == player1_data["username"])
        )
        conn.execute(set_score)
        set_score = (
            sqldb.users.update()
            .values(wins=player2_data["wins"] + 1)
            .where(sqldb.users.c.username == player2_data["username"])
        )
        conn.execute(set_score)

    return get_stored_user_data(player1_data["username"], player2_data["username"])


def calculate_winner(player1_handshape, player2_handshape):
    hand_shape1_index = HAND_SHAPES.index(player1_handshape)
    hand_shape2_index = HAND_SHAPES.index(player2_handshape)
    if hand_shape1_index == hand_shape2_index:
        return "tie"
    elif (hand_shape1_index - hand_shape2_index + 3) % 3 == 1:
        return "win"
    else:
        return "loss"


@app.route("/enter_usernames", methods=["GET", "POST"])
def enter_usernames():
    conn = sqldb.engine.connect()

    # print("\nHERE IS REQUEST.FORM ", request.form)
    for player, name in request.form.to_dict().items():
        if not name:
            name = "computer_player"

        if player == "player1":
            player1_name = name
        elif player == "player2":
            player2_name = name
        else:
            print("\n\n SOMEHOW A BADLY FORMATTED REQUEST CAME OMFG!!!!", request.form)

        query_user = sqldb.users.select().where(sqldb.users.c.username == name)
        result = conn.execute(query_user)
        results_list = result.mappings().all()

        if not results_list:
            ins = sqldb.users.insert().values(username=name)
            print(f"\nInserting new user: {ins.compile().params}\n\n")
            conn.execute(ins)

        else:
            print(f"\nUser {results_list[0]['username']} already exists\n\n")
    results_list = get_stored_user_data(player1_name, player2_name)

    return jsonify(results_list)


@app.route("/playgame", methods=["GET", "POST"])
def playgame():
    print("\n\nPLAYGAME ROUTE CALLED!!!! request.form.to_dict() ===============", request.form.to_dict())

    player1_name = request.form.to_dict()["playerName1"]
    player2_name = request.form.to_dict()["playerName2"]

    player1_handshape = request.form.to_dict()["handShape1"]
    player2_handshape = request.form.to_dict()["handShape2"]

    if player2_name == "":
        player2_name = "computer_player"
        player2_handshape = HAND_SHAPES[random.randint(0, 2)]

    if not player2_handshape:
        return jsonify(
            {"error": "Malformed Request! 2 player game requires handShape2"}
        )

    outcome = calculate_winner(player1_handshape, player2_handshape)

    stored_user_data = get_stored_user_data(player1_name, player2_name)
    for user_data in stored_user_data:
        if user_data["username"] == player1_name:
            player1_data = user_data
        elif user_data["username"] == player2_name:
            player2_data = user_data

    user_results = update_scores(outcome, player1_data, player2_data)
    print(f"\n\n\ FINAL user_results ===============, {user_results}\n\n")

    return jsonify({"user_results": user_results, "outcome": outcome})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
