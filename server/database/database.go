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
    if err = db.AutoMigrate(new(model.Plant)); err != nil {
        log.Println(err)
    }
    if err = db.AutoMigrate(new(model.Friend)); err != nil {
     log.Println(err)
    }
    if err = db.AutoMigrate(new(model.Enemy)); err != nil {
     log.Println(err)
    }
    if err = db.AutoMigrate(new(model.User)); err != nil {
     log.Println(err)
    }
    if err = db.AutoMigrate(new(model.GardenLayout)); err != nil {
     log.Println(err)
    }
    if err = db.AutoMigrate(new(model.Schedule)); err != nil {
     log.Println(err)
    }

  

   
    DBConn = db
}