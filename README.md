# Foobar

Rails 8 api and react SPA frontend with auth

## Installation

Add rails secrets for both dev and prod

```bash
# development
VISUAL="code --wait" bin/rails credentials:edit

# production
VISUAL="code --wait" bin/rails credentials:edit --environment production
```

Example credentials.yml

```bash
smtp:
  user_name: xxxxxxxxxx
  password: xxxxxxxxxx

secret_key_base: xxxxxxxxxx
jwt_secret: xxxxxxxxxx
base_url: http://localhost:3001
frontend_url: http://localhost:3000
```

Create .env in /frontend root dir with the following

```bash
VITE_API_URL="http://localhost:3001/api/v1"
VITE_BASE_URL="http://localhost:3001"
VITE_WS_URL="ws://localhost:3001/cable"

VITE_GOOGLE_MAPS_API_KEY="xxxxxxxxxxxx"
```

## Deploying to Heroku

Add node to the buildpack

```bash
heroku buildpacks:add --index 1 heroku/nodejs
```

Database commands to work with cache, cable and queue schemas

```bash
heroku run rails db:migrate
heroku run rails db:schema:load DISABLE_DATABASE_ENVIRONMENT_CHECK=1
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
