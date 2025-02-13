package routes

import (
	"fmt"

	"github.com/Maheshkarri4444/gin-googlelogin/controllers"
	"github.com/Maheshkarri4444/gin-googlelogin/middleware"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	fmt.Println("auth routes called")
	auth := r.Group("/auth")
	{
		auth.POST("/signup", controllers.Signup)
		auth.POST("/login", controllers.Login)
		auth.GET("/google", controllers.GoogleLogin)
		auth.GET("/google/callback", controllers.GoogleCallback)

		auth.GET("/profile", middleware.AuthMiddleware(), controllers.Profile)
	}

}
