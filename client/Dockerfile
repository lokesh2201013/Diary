FROM node:lts-alpine as BUILDER
WORKDIR /app
COPY package*.json ./ 
RUN npm ci --no-optional
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]
