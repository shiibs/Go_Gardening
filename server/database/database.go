package database

import (
	"log"

	"github.com/shiibs/go-garden-planner/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
    dsn := "host=localhost user=postgres password=postgres dbname=garden_planner port=5432 sslmode=disable TimeZone=Asia/Shanghai"

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Error),
    })

    if err != nil {
        panic("Database connection failed")
    }

    log.Println("DB connected")

    db.AutoMigrate(new(model.Plant))
    db.AutoMigrate(new(model.Friend))
    db.AutoMigrate(new(model.Enemy))
    db.AutoMigrate(new(model.User))
    db.AutoMigrate(new(model.GardenLayout))
    db.AutoMigrate(new(model.Schedule))

   
    DBConn = db
}