package main

import (
	"log"
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


// Or extend your config for customization
app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowHeaders: "Origin, Content-Type, Accept",
}))


    app.Use(logger.New( ))
  router.SetUpRoutes(app)
	// Start the server and log any errors
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
