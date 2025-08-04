import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("dataset_plant.csv")

features = [
    "Skor APTI","Skor API","PM2_5","SO2","NO2"
]
target = "Direkomendasikan"

x = df[features]
y = df[target]

model = RandomForestClassifier(
    random_state=42,
    n_estimators=100
)
model.fit(x,y)

print("DONEE MODELL PLANT")
joblib.dump(model,"plant_model.pkl")
joblib.dump(features,"plant_features.pkl")