#! /bin/bash

if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

echo "📋 Installing dependencies..."
. .venv/bin/activate && uv sync

uvicorn app.main:app --host 0.0.0.0 --port 8081 --reload
