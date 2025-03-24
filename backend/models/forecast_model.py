import pandas as pd
from prophet import Prophet

def forecast_stock(data: pd.DataFrame) -> pd.DataFrame:
    try:
        if data.empty:
            raise ValueError("Input DataFrame is empty.")

        df = data.reset_index()[['Date', 'Close']].rename(columns={'Date': 'ds', 'Close': 'y'})

        df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)

        df['y'] = pd.to_numeric(df['y'].values, errors='coerce')
        df = df.dropna()

        model = Prophet()
        model.fit(df)
        future = model.make_future_dataframe(periods=1)
        forecast = model.predict(future)
        
        # Extract the predicted price and date
        predicted_price = forecast['yhat'].iloc[-1]
        predicted_date = forecast['ds'].iloc[-1].date()  # Format to only display the date part
        
        return forecast, predicted_price, predicted_date

    except Exception as e:
        print(f"Error forecasting stock: {e}")
        return pd.DataFrame(), None, None