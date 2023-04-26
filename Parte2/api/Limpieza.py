import pandas as pd
import unicodedata
import re
import string
import nltk
from nltk.corpus import stopwords
from sklearn.base import BaseEstimator, TransformerMixin
from joblib import Parallel, delayed
from num2words import num2words
from langdetect import detect

class Limpieza(BaseEstimator, TransformerMixin):
    
    def __init__(self):
        self.stop_words = set(stopwords.words('spanish'))
        
    def fit(self, X, y=None):
        print("Limpieza de datos...")
        return self
    
    def transform(self, X, y=None):
        print("Transformando texto...")
        return self.preprocess(X)
    
    def preprocess(self, df: pd.DataFrame) -> pd.DataFrame:
        df = pd.DataFrame(df)
        print("Se removieron los caracteres ASCII")
        df['text'] = df['review_es'].apply(lambda x: unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8'))
        print("Se cambiaron las mayusculas por minusculas")
        df['text'] = df['text'].apply(lambda x: x.lower())
        print("Se eliminaron los signos de puntuacion")
        df['text'] = df['text'].apply(lambda x: x.translate(str.maketrans('', '', string.punctuation)))
        print("Se reemplazaron los numeros por su equivalente en palabras")
        df['text'] = df['text'].apply(lambda x: re.sub(r'\b\d+\b', lambda x: num2words(int(x.group(0)), lang='es'), x))
        print("Se eliminaron las stopwords")
        df['text'] = Parallel(n_jobs=-1)(delayed(self.remove_stopwords)(review) for review in df['text'])
        df_clean = df['text']
        return df_clean
    
    def remove_stopwords(self, review):
        tokens = nltk.word_tokenize(review)
        filtered_tokens = [token for token in tokens if token not in self.stop_words]
        return " ".join(filtered_tokens)
