# Base image with Node.js and npm pre-installed
FROM node:20-alpine
# Set the NODE_OPTIONS environment variable
ENV NODE_OPTIONS=--openssl-legacy-provider




# Set working directory
WORKDIR /usr/src/app


# Copy package.json and package-lock.json files


COPY ["frontendapp3/package.json","./"]
COPY ["frontendapp3/package-lock.json","./"]


# Copy the rest of the application code
#COPY --chown=node:node . .
# COPY ["frontendapp3/","./"]
#COPY ./frontendapp3/ ./
COPY ./frontendapp3/ .




# USER node
# "npm install" will base on package.json to install dependencies.
RUN npm install




# Optional: Build the React application (uncomment if needed)
# RUN npm run build


# Optional: Install 'serve' globally to serve the production build (uncomment if needed)
# RUN npm install -g serve


# Expose the port the app runs on
EXPOSE 3000


# Start the application in development mode
CMD ["npm", "start"]
