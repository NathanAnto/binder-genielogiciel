FROM node:18-alpine

# Install Meteor
RUN apk add --no-cache \
    git \
    curl \
    python3 \
    make \
    g++ \
    && curl https://install.meteor.com/ | sh

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN meteor npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN meteor build --directory /build

EXPOSE 3000

CMD ["meteor", "run"] 