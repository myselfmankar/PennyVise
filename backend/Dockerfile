FROM python:3.9-slim

WORKDIR /app


RUN ls -l

COPY  ./requirements.txt requirements.txt

# RUN pip install --no-cache-dir -r app/requirements.txt

# COPY . /app/

# EXPOSE 5000
# ENV FLASK_APP=app.py

CMD ["flask", "run", "--host=0.0.0.0"]