#!/usr/bin/env python3
"""
Test psycopg with CockroachDB.
"""

import time
import random
import logging
from argparse import ArgumentParser, RawTextHelpFormatter

import psycopg2
from psycopg2.errors import SerializationFailure

class Sprintr_DAL:
    """
    variables
    """
    def __init__(self, connection_str):
        self.connect = connection_str

    def create_accounts(self, user_email, user_username):
        conn = psycopg2.connect(self.connect.dsn)
        with conn.cursor() as cur:
            cur.execute(
                "CREATE TABLE IF NOT EXISTS accounts (id INT IDENTITY(1,1) PRIMARY KEY, email STRING, username STRING)"
            )
            cur.execute(f"UPSERT INTO accounts (email, username) VALUES ({user_email}, {user_username})")
            logging.debug("create_accounts(): status message: %s", cur.statusmessage)
        conn.commit()

    def create_running_records(self, user_id, run_start_time, run_distance, run_time):
        conn = psycopg2.connect(self.connect.dsn)
        with conn.cursor() as cur:
            cur.execute(
                "CREATE TABLE IF NOT EXISTS running_records (running_id INT IDENTITY(1,1) PRIMARY KEY, start_time DATETIME, distance DECIMAL, time DECIMAL, user_id INT)"
            )
            cur.execute(f"UPSERT INTO running_records (user_id, start_time, distance, time) VALUES ({user_id}, {run_start_time}, {run_distance}, {run_time})")
            logging.debug("create_accounts(): status message: %s", cur.statusmessage)
        conn.commit()

    def delete_accounts(self, user_id):
        conn = psycopg2.connect(self.connect.dsn)
        with conn.cursor() as cur:
            cur.execute(f"DELETE FROM runs.accounts WHERE id = {user_id}")
            logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
        conn.commit()
  

    def print_runs(self, user_id):
        conn = psycopg2.connect(self.connect.dsn)
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM running_records WHERE user_id = {user_id} ORDER BY start_time DESC")
            logging.debug("print_balances(): status message: %s", cur.statusmessage)
            rows = cur.fetchall()
            conn.commit()
            
            return rows


