package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/auth"
	"github.com/shiibs/go-garden-planner/controller"
	"github.com/shiibs/go-garden-planner/middleware"
)


func SetupRouters(app *fiber.App) {
	app.Get("/", controller.GetPlantList)
	app.Post("/add_plant", controller.CreatePlant)
	app.Post("/add_relation", controller.CreateRelationShipHandler)
	app.Get("/auth/login", auth.GoogleLoginHandler)
	app.Get("/auth/callback", auth.GoogleCallbackHandler)
	// app.Get("/getUser", auth.GetUserHandler)

	
	private := app.Group("/private")

	private.Use(middleware.Authenticate)

	private.Post("/create_gardenLayout",  controller.PostGardenPlanner)
	private.Get("/garden_layout/:id",controller.GetGardenLayoutWithID)
	private.Get("/refreshToken", controller.RefreshToken)
}

