FROM node:19.7.0 AS coin-srv-development
WORKDIR /app/
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY tsconfig.json ./
EXPOSE 4003
CMD npm start

# ----------------------------------------------------------------------------------
# build Layer
FROM 19.7.0 AS ssm-srv-build
WORKDIR /app/
COPY package.json package-lock.json ./
RUN true
# COPY tsconfig.json ./
RUN true
# COPY src /app/src

RUN npm install --legacy-peer-deps
RUN npm run build
