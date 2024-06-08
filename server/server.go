package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/shiibs/go-garden-planner/auth"
	"github.com/shiibs/go-garden-planner/database"
	"github.com/shiibs/go-garden-planner/router"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error in loading .env file", err)
	}
	
    database.ConnectDB()
	
    database.InitSession()
    
	// Initialize OAuth configuration
	auth.InitOAuth()

}

func main() {
    psqlDB, err := database.DBConn.DB()
    if err != nil {
        panic("error in database connection")
    }
    defer psqlDB.Close()

    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins:"http://localhost:5173",
        AllowHeaders: "Origin, Content-Type, Accept, Auth-token, token",
		AllowCredentials: true,
    }))

    app.Use(logger.New())

    router.SetupRouters(app)

    app.Listen(":8001")
}

