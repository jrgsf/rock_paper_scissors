# rock_paper_scissors
https://github.com/jrgsf/rock_paper_scissors

## Thought Process

### Rock, Paper, Scissors logic
My first thought was to figure out the basic logic of determining a winner. I remembered someone descibing the basic algorithm for rock, paper, scissors a few years back, and remembered that it was premised on having the choices listed sequentially in an array and just comparing the indices and using modulo to determine the relative spacing within the array. (I.e., rock as element 0 beats scissors as element 2, with a difference of 2 indices.)

### Frontend
With that logic ready, I wanted to get input to work with, so I focused on building out a very minimal frontend with React to provide successive pages with users first inputting names, then their "hand shape".

### Database
I then focused on building out the backend and a database. I started using pymongo would have preferred to use it, but soon realized I've never properly installed mongo on my personal machine-- I've only used it extensively on work computers. After losing some time on this, I went with SQL Alchemy instead (using SQLite.)

### Backend
Routes could be defined in a more "REST" style. In moving quickly, I have the logic work sequentially, with the business logic handled here instead of in the frontend.

### Multiple players
Focusing entirely on getting a one player game to work meant that I realized, too late, that my architecture did not allow for maintaining a game session to access state across the app for multiple users. I would have addressed this, rearchituring the app, if I had more time.

### Variable names
Using "move" or "choice" seemed too vague, so I went with the admittedly awkward "hand shape".

