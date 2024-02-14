docker build --no-cache --progress=plain -t alumni_backend .
# docker build --progress=plain -t alumni_backend .
docker run -p 8080:8080 alumni_backend
# docker run -it alumni_backend sh
# ls -la