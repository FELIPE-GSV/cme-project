FROM python:3.11.3-alpine3.18
LABEL maintainer="felipefeltz232@gmail.com"

# Essa variável de ambiente é usada para controlar se o Python deve 
# gravar arquivos de bytecode (.pyc) no disco. 1 = Não, 0 = Sim
ENV PYTHONDONTWRITEBYTECODE 1

# Define que a saída do Python será exibida imediatamente no console ou em 
# outros dispositivos de saída, sem ser armazenada em buffer.
# Em resumo, você verá os outputs do Python em tempo real.
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
    chmod -R +x /backend/scripts
    

ENV PATH="/scripts:/venv/bin:$PATH"

CMD ["commands.sh"]