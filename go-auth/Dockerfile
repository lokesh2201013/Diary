# Stage 1: Build stage
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o myapp .

# Stage 2: Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

# Copy the .env file to the runtime stage
COPY --from=builder /app/.env .

# Copy the binary from the builder stage
COPY --from=builder /app/myapp .

EXPOSE 8001
CMD ["./myapp"]
