package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/routes"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	// Attempt to load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Error in loading env file")
	}
	
	// Connect to the database
	database.ConnectDB()
}

func main() {
	// Check if the database connection is established properly
	sqlDb, err := database.DBConn.DB()
	if err != nil {
		log.Fatal("Failed to get database handle:", err)
	}
	defer sqlDb.Close()
    app := fiber.New()
	// Fetch port from environment variables
	app.Use(cors.New())
	app.Use(cors.New(cors.Config{
        AllowOrigins: "*", // or specify allowed origins
        AllowHeaders: "Origin, Content-Type, Accept",
        AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
    }))
	port := os.Getenv("port")
	if port == "" {
		port = "8001" // Default port if not set
	}

	// Initialize Fiber router
	router := fiber.New()
	 
	routes.SetupRoutes(router)
	// Start the server
	log.Fatal(router.Listen(":" + port))
}
