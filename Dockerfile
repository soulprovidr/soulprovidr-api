# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Run the application as a non-root user.
USER node

WORKDIR /home/node/app

COPY --chown=node:node  package*.json ./

# Install the application's dependencies.
RUN npm install

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 3001

# Use production node environment by default.
ENV NODE_ENV production

# Run the application.
CMD npm run start
