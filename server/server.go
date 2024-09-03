package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/router"
	"github.com/joho/godotenv"
)
func init() {
	database.ConnectDB()
	godotenv.Load(".env");err!=nil{
		log.Fatal("error in loding env file")
	}
}

func main() {
	sqlDb, err := database.DBConn.DB()
	if err != nil {
		panic("Error in SQL connection")
	}
	defer sqlDb.Close()

	app := fiber.New()
    app.Use(logger.New( ))
  router.SetUpRoutes(app)
	// Start the server and log any errors
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
