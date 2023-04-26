from joblib import load

class Model:

    def __init__(self):
        self.model = load("Pipeline.joblib")

    def make_prediction(self, data):
        result = self.model.predict(data)
        return result