package database

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB(){
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")
	dbport:=os.Getenv("dbport")
	dsn := "host=localhost port="+dbport+" user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"
    
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	
	 if err!=nil{
		panic("Error in database connection")
	 }
	 log.Println("DB Connected")
}