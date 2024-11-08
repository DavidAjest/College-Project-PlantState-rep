from keras.models import load_model

from keras.preprocessing import image
import numpy as np


class NeedsWater:
    value: int = 0
    prediction: float

    def __init__(self, prediction: float):
        self.prediction = prediction

    def __str__(self) -> str:
        return "The plant needs water urgently"


class Healthy:
    value = 1
    prediction: float
    
    def __init__(self, prediction: float):
        self.prediction = prediction

    def __str__(self) -> str:
        return "The plant is healthy! does not need urgent watering"


class HealthAssement:
    def __init__(self):
        self.model = load_model("models/my_improved_model256256.h5")
        self.image = None

    def predict(self):
        if not np.any(self.image):
            raise RuntimeError(
                "Prediction can not be done without an image loaded. call load_img() before using predict()"
            )

        prediction = self.model.predict(self.image)[0, 0]
        return Healthy(prediction) if prediction > 0.5 else NeedsWater(prediction)

    def load_plant_image(self, path: str):
        img = image.load_img(path, target_size=(256, 256))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        self.image = img / 255
