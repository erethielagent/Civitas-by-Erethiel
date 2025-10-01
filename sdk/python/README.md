# Erethiel Python SDK - Civitas

### Setup

```
pip install civitas
```

### Usage

Make LLM API call using OpenAI API spec and verify the signature:

```python
import civitas
from openai import OpenAI

client = OpenAI(
    base_url="https://api.erethiel.com/v1/verified",
    api_key="Bearer ERETHIEL_API_KEY",
)

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"},
    ],
)

print("completion:", completion)
is_valid = civitas.verify_signature(completion)
print("is_valid:", is_valid)
```

Fetch all previous verified inference requests:
```python
from typing import List
import civitas
from civitas.history import ErethielChatHistory

history: List[ErethielChatHistory] = civitas.get_history(
    erethiel_api_key="Bearer ERETHIEL_API_KEY"
)

for item in history:
    print("\n\nResult:")
    print(f"Request: {item.request.get('messages')}")
    print(f"Message: {item.response.choices[0].message}")
    print(f"Hash: {item.hash}")
    print(f"Signed public key: {item.public_key}")
    print(f"Signature: {item.signature}")
    print(f"Tx hash: {item.tx_hash}")
    print(f"Attestation: {item.attestation[:10]}...")

    is_valid = civitas.verify_signature(item)
    print("is_valid:", is_valid)
```

Fetch a single verified inference request by hash:
```python
import civitas
from civitas.history import ErethielChatHistory

item: ErethielChatHistory = civitas.get_by_hash(
    erethiel_api_key="Bearer ERETHIEL_API_KEY",
    hash="922e575ef7f07449977001c1caaf78fb6ad8b731cd625434f9215087a6c2b39f"
)
print("\n\nResult:")
print(f"Request: {item.request.get('messages')}")
print(f"Message: {item.response.choices[0].message}")
print(f"Hash: {item.hash}")
print(f"Signed public key: {item.public_key}")
print(f"Signature: {item.signature}")
print(f"Tx hash: {item.tx_hash}")
print(f"Attestation: {item.attestation[:10]}...")

is_valid = civitas.verify_signature(item)
print("is_valid:", is_valid)
```
