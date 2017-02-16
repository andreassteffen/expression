import pandas as pd

def calc_whisker(data):
	print data
	Q1, median, Q3 = pd.np.percentile(data.expression.tolist(), [25, 50, 75])
	IQR = Q3 - Q1

	loval = Q1 - 1.5 * IQR
	hival = Q3 + 1.5 * IQR

	whiskhi = list(pd.np.compress(data.expression >= hival, data.expression))
	whisklo = list(pd.np.compress(data.expression <= loval, data.expression))
	
	return pd.Series({'open':Q1, 'median': median, 'high': Q3, 'low': loval, 'high': hival, 'outliers': whiskhi+whisklo })
