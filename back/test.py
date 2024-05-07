from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'tigercreatives@gmail.com'
app.config['MAIL_PASSWORD'] = 'agwr mytf gqde bczy'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@example.com'

mail = Mail(app)


@app.route('/send_mail')
def send_mail():
    msg = Message("Hello from Flask-Mail",
                  recipients=["jodonnell072@gmail.com"])
    msg.body = "This is a test email sent from a Flask application using Flask-Mail."
    mail.send(msg)
    return "Email sent!"

if __name__ == "__main__":
    app.run(debug=True)
