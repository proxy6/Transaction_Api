FROM node:14.16-alpine as development
ARG PORT=3500
COPY ./ /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD (if [[ "NODE_ENV" == "developemnt" ]]; then \
        npm run seedDB && npm run seedDB; \
        npm run seedDB && node app.js; \
    else \
        npm run migrate && npm run seedDB && node app.js; \
    fi);

