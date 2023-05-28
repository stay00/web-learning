# from flask_migrate import Migrate
from app import create_app
# from .app import create_app
# from proj import create_app


if __name__ == '__main__':
    app = create_app()
    # migrate = Migrate(app, db)
    print(app.url_map)
    # app.run(debug=False, host='127.0.0.1', port=8080)
    app.run(debug=True, host='127.0.0.1', port=8080)

