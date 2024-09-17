package database

import (
	"log"
	"os"

	"github.com/lokesh2201013/Diary/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	// Fetch environment variables
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")

	// Construct the DSN (Data Source Name)
	dsn := "host=localhost port=5432 user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"

	// Connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("DB connection failure: " + err.Error())
	}

	log.Println("Connected to database")

	// Automigrate your model
	db.AutoMigrate(&model.Diary{})
	DBConn = db
}
