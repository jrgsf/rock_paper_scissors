from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData

engine = create_engine("sqlite:///rps.db", echo=True)
meta = MetaData()

users = Table(
    "users",
    meta,
    Column("username", String, primary_key=True),
    Column("wins", Integer, default=0),
    Column("losses", Integer, default=0),
    Column("ties", Integer, default=0),
)

meta.create_all(engine)
