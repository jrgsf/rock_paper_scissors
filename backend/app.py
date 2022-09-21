from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import sqldb

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)

hand_shapes = ["rock", "paper", "scissors"]


def get_active_users():
    conn = sqldb.engine.connect()
    query_all_users = (
        sqldb.users.select()
        .where(sqldb.users.c.active_as != None)
        .order_by(sqldb.users.c.active_as)
    )
    result = conn.execute(query_all_users)
    results_list = [r._asdict() for r in result.all()]
    return results_list


def update_scores(outcome, player1_data, player2_data):
    conn = sqldb.engine.connect()
    if outcome == "tie":
        for player in ["player1", "player2"]:
            set_score = (
                sqldb.users.update()
                .values(ties=player1_data["ties"] + 1)
                .where(sqldb.users.c.active_as == player)
            )
        conn.execute(set_score)

    elif outcome == "win":
        set_score = (
            sqldb.users.update()
            .values(wins=player1_data["wins"] + 1)
            .where(sqldb.users.c.active_as == "player1")
        )
        conn.execute(set_score)
        set_score = (
            sqldb.users.update()
            .values(losses=player2_data["losses"] + 1)
            .where(sqldb.users.c.active_as == "player2")
        )
        conn.execute(set_score)

    elif outcome == "loss":
        set_score = (
            sqldb.users.update()
            .values(wins=player2_data["wins"] + 1)
            .where(sqldb.users.c.active_as == "player2")
        )
        conn.execute(set_score)
        set_score = (
            sqldb.users.update()
            .values(losses=player1_data["losses"] + 1)
            .where(sqldb.users.c.active_as == "player1")
        )
        conn.execute(set_score)

    return get_active_users()


def calculate_winner(a, b):
    conn = sqldb.engine.connect()
    if a == b:
        return "tie"
    elif (a - b + 3) % 3 == 1:
        return "win"
    else:
        return "loss"


def random_hand_shape():
    return random.randint(0, 2)


def get_computer_player_hand_shape():
    conn = sqldb.engine.connect()
    computer_player_hand_shape = random_hand_shape()
    set_hand_shape = (
        sqldb.users.update()
        .values(current_hand_shape=computer_player_hand_shape)
        .where(sqldb.users.c.username == "computer_player")
    )
    conn.execute(set_hand_shape)
    return computer_player_hand_shape


@app.route("/enter_usernames", methods=["GET", "POST"])
def enter_usernames():
    conn = sqldb.engine.connect()

    set_all_to_inactive = sqldb.users.update().values(
        active_as=None, current_hand_shape=None
    )
    conn.execute(set_all_to_inactive)

    for player, name in request.form.to_dict().items():
        if not name:
            name = "computer_player"

        query_user = sqldb.users.select().where(sqldb.users.c.username == name)
        result = conn.execute(query_user)
        results_list = result.mappings().all()

        if not results_list:
            ins = sqldb.users.insert().values(username=name, active_as=player)
            print(f"\nInserting new user: {ins.compile().params}\n\n")
            conn.execute(ins)

        else:
            print(f"\nUser {results_list[0]['username']} already exists\n\n")
            set_to_active = (
                sqldb.users.update()
                .values(active_as=player)
                .where(sqldb.users.c.username == results_list[0]["username"])
            )
            conn.execute(set_to_active)

    results_list = get_active_users()

    return jsonify(results_list)


@app.route("/get_userdata", methods=["GET"])
def get_userdata():
    results_list = get_active_users()
    return jsonify(results_list)


@app.route("/playgame", methods=["GET", "POST"])
def playgame():
    conn = sqldb.engine.connect()

    player1_handshape = hand_shapes.index(request.form.to_dict()["handShape"])
    player2_handshape = random_hand_shape()

    outcome = calculate_winner(player1_handshape, player2_handshape)
    results_list = get_active_users()

    for player_data in results_list:
        if player_data["active_as"] == "player1":
            player1_data = player_data
        else:
            player2_data = player_data

    user_results = update_scores(outcome, player1_data, player2_data)

    return jsonify({"user_results": user_results, "outcome": outcome})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
