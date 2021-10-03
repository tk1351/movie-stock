heroku login --interactive

# apiディレクトリへ移動し、herokuへログイン
cd api/ && heroku container:login

# herokuへDockerfileをpush
heroku container:push web

# 成功したらリリース
heroku container:release web

heroku open