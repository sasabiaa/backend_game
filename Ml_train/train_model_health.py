import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report
from xgboost import XGBClassifier
import joblib

df = pd.read_csv("dataset_health.csv")

features = ["Temperature","Humidity","PM2_5","PM10","NO2","SO2","CO"]
target = "Air Quality"

le = LabelEncoder()
df[target]= le.fit_transform(df[target])
df = df.dropna(subset=features+[target])
x = df[features]
y = df[target]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state= 42, stratify=y
)

model = XGBClassifier(
    objective = "multi:softprob",
    num_class = len(np.unique(y)),
    random_state = 42,
    n_estimators = 200,
    max_depth = 6,
    eval_metric = "mlogloss"
)
model.fit(x_train,y_train)

y_pred = model.predict(x_test)
label_names = le.classes_.tolist()
print("DONEE MODELL HEALTHH")
print(classification_report(y_test, y_pred, target_names=label_names))

joblib.dump(model, "health_model.pkl")
joblib.dump(scaler, "health_scaler.pkl")
joblib.dump(le, "health_label.pkl")




