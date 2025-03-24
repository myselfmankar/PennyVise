import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings("ignore")

def get_investment_recommendations(investment_name, data):
    """
    Recommends investments based on clustering analysis.

    Args:
        investment_name (str): The name of the investment for which to generate recommendations.
        data (pd.DataFrame): DataFrame containing investment data with columns:
            'Investment Type', 'Risk Level', 'Past Performance', and 'Investment Name'.

    Returns:
        list: A list of recommended investment names.
    """

    # Select features for clustering
    features = ['Investment Type', 'Risk Level', 'Past Performance']

    # Handle missing values by filling with the mean
    data = data[features+['Investment Name']].dropna()

    # Convert categorical variables to numerical using one-hot encoding
    data = pd.get_dummies(data, columns=['Investment Type'])

    # Standardize the features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(data.drop(columns=['Investment Name']))

    # Determine the optimal number of clusters using the Elbow Method
    inertia = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, random_state=42, n_init='auto')
        kmeans.fit(scaled_features)
        inertia.append(kmeans.inertia_)

    # Use elbow method to determine optimal number of clusters
    # In this case, we will hardcode the number of clusters to 3
    n_clusters = 3

    # Apply K-Means clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init='auto')
    data['Cluster'] = kmeans.fit_predict(scaled_features)

    # Get the cluster of the input investment
    investment_cluster = data[data['Investment Name'] == investment_name]['Cluster'].values[0]

    # Get investments in the same cluster
    recommendations = data[data['Cluster'] == investment_cluster]['Investment Name'].tolist()

    # Remove the input investment from the recommendations
    recommendations = [rec for rec in recommendations if rec != investment_name]

    return recommendations
