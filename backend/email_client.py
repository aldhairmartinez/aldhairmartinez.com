"""Sends contact-form notifications through Resend's HTTPS API.

Deliberately one function, one HTTP call — no SDK, no retries, no queue.
Resend does the actual SMTP delivery on the other end; this module never
touches SMTP directly, and never touches Cloudflare Email Routing (that's
inbound-only and unrelated to this outbound send).
"""

import os

import httpx

RESEND_API_URL = "https://api.resend.com/emails"
REQUEST_TIMEOUT = 10.0

# Non-secret, safe defaults — real values (especially CONTACT_TO_EMAIL, which
# points at a personal inbox during testing) live only in backend/.env.
CONTACT_TO_EMAIL = os.getenv("CONTACT_TO_EMAIL", "hello@aldhairmartinez.com")
CONTACT_FROM_EMAIL = os.getenv("CONTACT_FROM_EMAIL", "noreply@aldhairmartinez.com")


class EmailDeliveryError(Exception):
    pass


def send_contact_email(name: str, email: str, message: str) -> None:
    api_key = os.getenv("RESEND_API_KEY")
    if not api_key:
        raise EmailDeliveryError("RESEND_API_KEY is not configured")

    payload = {
        "from": CONTACT_FROM_EMAIL,
        "to": [CONTACT_TO_EMAIL],
        "reply_to": email,
        "subject": f"Contact form: {name}",
        "text": f"Name: {name}\nEmail: {email}\n\n{message}",
    }

    try:
        response = httpx.post(
            RESEND_API_URL,
            headers={"Authorization": f"Bearer {api_key}"},
            json=payload,
            timeout=REQUEST_TIMEOUT,
        )
        response.raise_for_status()
    except httpx.HTTPError as err:
        raise EmailDeliveryError(f"Resend request failed: {err}") from err
