package main

import (
	"log"
	"os"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/router"
	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2/middleware/cors"
)
func init() {
	// Load environment variables from the .env file
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error in loading env file")
	}

	// Connect to the database
	database.ConnectDB()
}
func main() {
    sqlDb, err := database.DBConn.DB()
    if err != nil {
        panic("Error in SQL connection")
    }
    defer sqlDb.Close()

    app := fiber.New()

    // Initialize default config
    app.Use(cors.New())
    app.Static("/static", "./static")

    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
        AllowHeaders: "Origin, Content-Type, Accept",
    }))

    app.Use(logger.New())
    router.SetUpRoutes(app)

    // Get the PORT from environment variable
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080" // Default for local testing
    }

    // Start the server and log any errors
    if err := app.Listen(":" + port); err != nil {
        log.Fatalf("Error starting server: %v", err)
    }
}
