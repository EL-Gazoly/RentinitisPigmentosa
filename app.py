from fastapi import FastAPI
from routes.__init__ import CNNRouter, UserRouter, SignupLoginRouter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(CNNRouter)
app.include_router(UserRouter)
app.include_router(SignupLoginRouter)

