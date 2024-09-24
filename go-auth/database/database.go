package database

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"github.com/lokesh2201013/Diary/model"
)

var DBConn *gorm.DB
func ConnectDB() {
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")
	dbport := os.Getenv("dbport")
	host:=os.Getenv("host")

	// Debugging: Print environment variables to ensure they are set
	log.Printf("User: %s, Password: %s, DBName: %s, DBPort: %s", user, password, dbname, dbport)

	// Check if any environment variable is empty
	if user == "" || password == "" || dbname == "" || dbport == "" {
		panic("One or more environment variables are not set")
	}

dsn := "host="+host+ "port=5432 user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic("Error in database connection")
	}
	log.Println("DB Connected")
	if err := db.AutoMigrate(new(model.User)); err != nil {
		log.Fatalf("Error migrating database: %v", err)
	}
	
	DBConn = db
}
