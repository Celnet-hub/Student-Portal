# syntax=docker/dockerfile:1
FROM python:3.8-alpine

#Python will not try to write .pyc files
ENV PYTHONDONTWRITEBYTECODE=1 

#ensures our console output is not buffered by Docker
ENV PYTHONUNBUFFERED=1

#disables an automatic check for pip updates each time
ENV PIP_DISABLE_PIP_VERSION_CHECK 1

WORKDIR /app/backend/

COPY requirements.txt /app/backend/

RUN apk update && apk add postgresql-dev gcc python3-dev libffi-dev musl-dev  &&\
        pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]