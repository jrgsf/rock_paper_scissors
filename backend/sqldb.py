from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData

engine = create_engine('sqlite:///rps.db', echo = True)
meta = MetaData()

users = Table(
   'users', meta, 
   Column('username', String, primary_key = True), 
   Column('wins', Integer), 
   Column('losses', Integer), 
   Column('ties', Integer), 
   # Column('active_as', String), 
   Column('current_move', String), 
)
meta.create_all(engine)
conn = engine.connect()