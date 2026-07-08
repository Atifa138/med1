import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

print("=" * 50)
print("GOOGLE_API_KEY:")
print(repr(os.getenv("GOOGLE_API_KEY")))

print()

print("GEMINI_MODEL:")
print(repr(os.getenv("GEMINI_MODEL")))
print("=" * 50)