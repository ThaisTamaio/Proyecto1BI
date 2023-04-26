import pandas as pd
from fastapi import FastAPI, UploadFile
from prediction_model import Model
from data_model import ReviewModel
from fastapi.middleware.cors import CORSMiddleware
import io

from typing import List

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    global prediction_model
    prediction_model = Model()

@app.post("/predict")
async def make_prediction_file(file: UploadFile):
    print("Se va a predecir las reviews del archivo ", file.filename)
    contents = await file.read()
    file_in_memory = io.BytesIO(contents)
    df = pd.read_csv(file_in_memory)
    results = prediction_model.make_prediction(df)
    return results.tolist()

@app.post("/predictone")
def make_prediction(dataModel: ReviewModel):
    print("Se va a predecir la review ", dataModel.review_es)
    df = pd.DataFrame([dataModel.review_es], columns=["review_es"])
    results = prediction_model.make_prediction(df)
    return results.tolist()