package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/routes"
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

	// Fetch port from environment variables
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
