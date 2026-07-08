"""
models/

SQLAlchemy ORM models for the application.

Currently contains a minimal `Report` model as a structural placeholder so
the database layer (engine, session, `init_db`) can be demonstrated end to
end. No business logic or relationships beyond basic fields are included.
"""
from .user import User