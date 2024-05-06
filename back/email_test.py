import requests

DOMAIN_NAME = "sandbox4303d2cc641e4a17b3997aa9265f3240.mailgun.org"
API_KEY = "ed54d65c-6964eaff"

def send_simple_message(from_addr, to_addrs, subject, body):
    return requests.post(
        f"https://api.mailgun.net/v3/{DOMAIN_NAME}/messages",
        auth=("api", API_KEY),
        data={"from": from_addr,
              "to": to_addrs,
              "subject": subject,
              "text": body})

response = send_simple_message(
    "Excited User <mailgun@sandbox4303d2cc641e4a17b3997aa9265f3240.mailgun.org>",
    ["yh2673@princeton.edu"],
    "Hello",
    "Testing some Mailgun awesomeness!")

print(response.status_code)
print(response.text)
