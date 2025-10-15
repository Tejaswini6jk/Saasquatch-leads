from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from pathlib import Path

from scoring import score_dataframe, score_lead


app = Flask(__name__)
CORS(app)

DATA_PATH = Path(__file__).parent / "leads.csv"


def load_leads() -> pd.DataFrame:
    if DATA_PATH.exists():
        try:
            df = pd.read_csv(DATA_PATH)
            # Replace NaN values with None for proper JSON serialization
            df = df.where(pd.notna(df), None)
            return df
        except Exception:
            return pd.DataFrame([])
    return pd.DataFrame([])


@app.get("/api/leads")
def get_leads():
    df = load_leads()
    if df.empty:
        return jsonify([])

    df = score_dataframe(df)

    industry = request.args.get("industry")
    region = request.args.get("region")
    min_score = request.args.get("min_score")

    if industry:
        df = df[df["industry"].astype(str).str.lower() == industry.lower()]
    if region:
        df = df[df["region"].astype(str).str.lower() == region.lower()]
    if min_score is not None:
        try:
            min_score_int = int(min_score)
            df = df[df["score"] >= min_score_int]
        except Exception:
            pass

    return jsonify(df.to_dict(orient="records"))


@app.post("/api/score")
def post_score():
    payload = request.get_json(silent=True) or {}
    score_value = score_lead(pd.Series(payload))
    return jsonify({"score": int(score_value)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


