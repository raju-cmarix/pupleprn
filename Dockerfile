FROM --platform=linux/amd64 nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]