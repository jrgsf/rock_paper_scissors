# rock_paper_scissors

## Thought Process

My first thought was to figure out the basic logic of determining a winner. I remembered someone descibing the basic algorithm for rock, paper, scissors a few years back, and remembered that it was premised on having the choices listed sequentially in an array and just comparing the indices and using modulo to determine the relative spacing within the array. (I.e., rock as element 0 beats scissors as element 2, with a difference of 2 indices.)

With that logic ready, I wanted to get input to work with, so I focused on building out the front end to provide successive pages with the following user inputs:
- username
- whether one or two players
- player's choice of "handShape" (which seemed more descriptive than a vague abstraction like "move")

Once I was able to get each page to render and communicate its data to the backend, I started working on the backend. 
I had orginally planned on just making use of flask-sessions to refer to the current user, but this encountered an issue I got stuck trying to resolve. Losing some time before giving up on using sessions, I decided it might be easier to have persistance layer with a database. Mongodb ran into some issues on (older) my personal machine, so I switched tactics again, to sqlalchemy.
By this point, I was over the alloted time.

## Things I would've done with more time:

- Backend: 
- db: it would have been most time-efficient to have simply done without any database, but for the reasons explained above, it seemed necessary. 

