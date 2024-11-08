from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from health_assesment import *
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def upload_file(file: UploadFile):
    # Save the uploaded file to a directory
    file_path = f"temp/{file.filename}"
    with open(file_path, "wb") as buffer:
        # Read the content of the uploaded file
        contents = await file.read()
        buffer.write(contents)
    # Make sure to close the file after saving
    await file.close()

    return file_path


@app.post("/predict")  # / POST http://localhost:8080/predict
async def predict_action(file: UploadFile = File(...)):
    # Create a new health assement
    assesment = HealthAssement()
    # Upload the file
    path = await upload_file(file)
    # Load the image
    assesment.load_plant_image(path)
    # Predict the health of the plant
    assesment = assesment.predict()
    # Delete the file
    os.remove(path)
    # Return the result
    return {
        "message": str(assesment),
        "class": assesment.value,
        "prediction": float(assesment.prediction),
    }
