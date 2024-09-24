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
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")
	host:=os.Getenv("host")

	log.Println("User:", user)
	log.Println("Password:", password)
	log.Println("DBName:", dbname)

	dsn := "host="+host+ "port=5432 user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"
	log.Printf("Connecting with DSN: %s", dsn)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("DB connection failure: " + err.Error())
	}

	log.Println("Connected to database")
	db.AutoMigrate(&model.Diary{})
	DBConn = db
}
