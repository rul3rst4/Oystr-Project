from email import message
import json
import requests
import random
import time

address = "http://localhost:3002/"

notification1 = {
    "evt": "ExecutionFinishedWithError",
    "execution": "20201015.111226-ij0uxv",
    "owner": 56,
    "bot": "pje-trt-copia-integral"
}

notification2 = {
    "evt": "ReportGenerated",
    "execution": "20201015.111226-ij0uxv",
    "owner": 56,
    "bot": "pje-trt-copia-integral"
}


def send_valid_request(notification):
    r = requests.post(url=address, json=notification)
    message = r.text
    print("{status} - {message}".format(status=r, message=message))


def send_incomplete_request_body(notification):
    aux = notification.copy()
    aux.pop("evt")
    r = requests.post(url=address, json=aux)
    message = r.text
    print("{status} - {message}".format(status=r, message=message))


def send_invalid_request_body(*args):
    headers = {'Content-type': 'text/plain'}
    r = requests.post(url=address,
                      data="definitely not a json", headers=headers)
    message = r.text
    print("{status} - {message}".format(status=r, message=message))


def send_invalid_request(*args):
    r = requests.get(url=address)

    print("{status}".format(status=r))


def send_invalid_field_type(notification):
    aux = notification.copy()
    aux["evt"] = 22
    aux["owner"] = "test"
    r = requests.post(url=address, json=aux)
    message = r.text
    print("{status} - {message}".format(status=r, message=message))


for test in [send_valid_request, send_incomplete_request_body, send_invalid_request_body, send_invalid_request, send_invalid_field_type]:
    test(notification1)
    time.sleep(1)
