FROM python:3.11.3-alpine3.18
LABEL maintainer="felipefeltz232@gmail.com"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 8000

RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    postgresql-dev \
    build-base \
    linux-headers

COPY . /backend
COPY scripts /scripts

WORKDIR /backend

RUN python -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r /backend/requirements.txt

RUN mkdir -p /backend/data/web/static && \
    mkdir -p /backend/data/web/media && \
    mkdir -p /backend/data/web/images && \
    chmod -R 775 /backend/data/web/static && \
    chmod -R 775 /backend/data/web/media && \
    chmod -R +x /backend/scripts && \sudo chown [user] -R [/backend] && \
    chmod +x /scripts/commands.sh

ENV PATH="/scripts:/venv/bin:$PATH"

CMD sh -c "\
  set -e && \
  while ! nc -z \$POSTGRES_HOST \$POSTGRES_PORT; do \
    echo '🟡 Waiting for Postgres Database Startup (\$POSTGRES_HOST \$POSTGRES_PORT) ...' && \
    sleep 2; \
  done && \
  echo '✅ Postgres Database Started Successfully (\$POSTGRES_HOST:\$POSTGRES_PORT)' && \
  python manage.py collectstatic --noinput && \
  python manage.py makemigrations cmetrackbd --noinput && \
  python manage.py migrate cmetrackbd --noinput && \
  python manage.py runserver 0.0.0.0:8000"
