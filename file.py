import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

# Email configuration
sender_email = 'hmamedabddelmounaim@gmail.com'
receiver_email = 'mounaimhmamed@gmail.com'
password = 'gbds viwt sjbj mqib'
smtp_server = 'smtp.gmail.com'
smtp_port = 587  # 587 is the default for TLS

# Create the email message
subject = 'Hello, this is a test email'
message = 'This is the body of the email.'

msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject

# Attach the message body
msg.attach(MIMEText(message, 'plain'))

# Optional: Attach a file
# file_path = 'path_to_your_file.txt'
# with open(file_path, 'rb') as file:
#     part = MIMEApplication(file.read(), Name='your_file.txt')
#     part['Content-Disposition'] = f'attachment; filename={part.name}'
#     msg.attach(part)

# Connect to the SMTP server and send the email
try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Upgrade the connection to a secure TLS connection
    server.login(sender_email, password)

    # Send the email
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)

    print('Email sent successfully!')
except Exception as e:
    print(f'Error: {e}')
finally:
    server.quit()  # Close the SMTP server connection