#! /bin/bash

uvicorn app.main:app --host localhost --port 8081 --reload
