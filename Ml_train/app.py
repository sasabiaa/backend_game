from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

health_model = joblib.load("health_model.pkl")
health_scaler = joblib.load("health_scaler.pkl")
health_label = joblib.load("health_label.pkl")

@app.route("/predict/health", methods = ["POST"])
def predict_health():
    try:
        data = request.json
        features = [
            data["Temperature"],
            data["Humidity"],
            data["PM2_5"],
            data["PM10"],
            data["NO2"],
            data["SO2"],
            data["CO"]
        ]
        print(features)

        x_scaled = health_scaler.transform([features])
        pred_class = health_model.predict([x_scaled][0])
        pred_label = health_label.inverse_transform([pred_class])[0]

        return jsonify(
            {
                "Prediksi_health" : pred_label
            }
        )
    except Exception as e:
        raise e

plant_model = joblib.load("plant_model.pkl")
plant_features = joblib.load("plant_features.pkl")
plant_dataset = pd.read_csv("dataset_plant.csv")

def recomend_plant(pollution_level,plant_db, model,columns):
    test_df = plant_db.copy()
    test_df["PM2_5"] = pollution_level["PM2_5"]
    test_df["SO2"] = pollution_level["SO2"]
    test_df["NO2"] = pollution_level["NO2"]
    test_df = test_df[columns]

    predictions = model.predict(test_df)

    recomend_plant_df = plant_db[predictions==1].copy()

    if not recomend_plant_df.empty:
        recomendations = recomend_plant_df[[
            "Nama Spesies","Skor API", "Skor APTI"]
        ].to_dict(orient = "records")
        for rec in recomendations:
            rec["Nama_Spesies"] = rec.pop("Nama Spesies")
            rec["Skor_API"] = rec.pop("Skor API")
            rec["Skor_APTI"] = rec.pop("Skor APTI")
        
        return sorted(recomendations, key= lambda x:x["Skor_API"],reverse=True)
    
    return[]

def convert_PM2_5(PM2_5):
    if PM2_5 <= 15.4:
        return 1
    elif 15.5 <= PM2_5 <= 55.4:
        return 2
    else : 
        return 3
    
def convert_SO2(SO2):
    if SO2 <= 75:
        return 1
    elif 76 <= SO2 <= 800:
        return 2
    else :
        return 3
    
def convert_NO2(NO2):
    if NO2 <= 100:
        return 1
    elif 101 <= NO2 <= 200:
        return 2
    else:
        return 3

@app.route("/predict/plant", methods = ["POST"])
def predict_plant():
    data = request.json
    pollution_level = {
        "PM2_5" : convert_PM2_5(float(data["PM2_5"])),
        "SO2" : convert_SO2(float(data["SO2"])),
        "NO2" : convert_NO2(float(data["NO2"])),
    }
    recomended_plant = recomend_plant(pollution_level, plant_dataset, plant_model, plant_features)

    return jsonify(
        {
            "recomend_plant" : recomended_plant
        }
    )

disease_model = joblib.load("disease_model.pkl")
disease_scaler = joblib.load("disease_scaler.pkl")
disease_label = joblib.load("disease_label.pkl")

@app.route("/predict/disease",methods = ["POST"])
def predict_disease():
    data = request.json
    features = [
        data["Temperature"],
        data["Humidity"],
        data["Wind_Speed"],
        data["fever"],
        data["cough"],
        data["fatigue"]
    ]
    
    x_scaled = disease_scaler.transform([features])
    pred_class = int(disease_model.predict(x_scaled)[0])
    pred_label = disease_label.inverse_transform([pred_class])[0]

    return jsonify(
        {
            "predict_disease" : pred_label
        }
    )
if __name__ == "__main__":
    app.run(port=5000,debug=True)