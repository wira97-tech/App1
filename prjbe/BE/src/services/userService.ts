import { Not, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Request, Response } from "express"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { verify } from "jsonwebtoken"
import { loginSchema, registerSchema } from "../utils/validator/authValidator"
import * as fs from "fs"
import { v2 } from "cloudinary"

export default new (class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

  async findall(req: Request, res: Response): Promise<Response> {
    try {
      const dataResponse = await this.userRepository.find()
      return res.status(200).json({ message: "Success", data: dataResponse })
    } catch (err) {
      return res.status(500).json({ message: "Error" })
    }
  }

  async Register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const { error } = registerSchema.validate(req.body)
      if (error) {
        res.send(error)
      }
      const responseData: number = await this.userRepository.count({
        where: { userName: data.userName },
      })
      if (responseData === 2) {
        return res.status(404).json({ message: "username is already exist" })
      }
      const bcryptPassword = await bcrypt.hash(data.password, 10)
      const User = this.userRepository.create({
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        password: bcryptPassword,
      })
      const insertData = await this.userRepository.save(User)
      return res.status(200).json({
        message: "success registering new user",
        insertData: insertData,
      })
    } catch (error) {
      console.error("error", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      console.log("ini", data)
      const loginSession = res.locals.loginSession
      const { error } = loginSchema.validate(req.body)
      if (error) {
        return res.send(error)
      }
      const responseData = await this.userRepository.findOne({
        where: { email: data.email },
      })
      if (responseData === undefined) {
        return res.status(404).json({ message: "email not registered" })
      }
      const checkPassword = await bcrypt.compare(
        data.password,
        responseData.password
      )
      if (checkPassword === false) {
        return res.status(404).json({ message: "password is wrong" })
      }
      const userForToken = {
        id: responseData.id,
        email: responseData.email,
        userName: responseData.userName,
        fullName: responseData.fullName,
        profil_picture: responseData.profil_picture,
        profil_description: responseData.profil_description,
      }
      const token = jwt.sign({ user: userForToken }, "butuan1997", {
        expiresIn: "2h",
      })
      res.locals.loginSession = userForToken
      return res.status(200).json({ message: "succesfully login", token })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "email or password not registered" })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id)

      const userDataToUpdate = req.body
      const image = res.locals.filename
      const userToUpdate = await this.userRepository.findOne({
        where: { id: userId },
      })
      if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" })
      }

      let cloudinaryImageUrl = null
      if (image) {
        console.log("Nama:", image)
        const imagePath = "src/uploads/" + image
        console.log("Path:", imagePath)

        // Periksa apakah file gambar ada sebelum diunggah
        if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ error: "image not found" })
        }
        console.log("Path:", imagePath)

        v2.config({
          cloud_name: "dem7wdexn",
          api_key: "865441742318562",
          api_secret: "lEDmBisXMNivpjfCyN3tFNOjEGY",
        })
        console.log("Cloudinary Image URL:", cloudinaryImageUrl)
        const cloudinaryResponse = await v2.uploader.upload(imagePath)
        cloudinaryImageUrl = cloudinaryResponse.secure_url
      }
      userToUpdate.fullName = userDataToUpdate.fullName || userToUpdate.fullName
      userToUpdate.userName = userDataToUpdate.userName || userToUpdate.userName
      userToUpdate.profil_picture =
        cloudinaryImageUrl || userToUpdate.profil_picture
      userToUpdate.profil_description =
        userDataToUpdate.profil_description || userToUpdate.profil_description

      const updatedUser = await this.userRepository.save(userToUpdate)

      return res.status(200).json({
        message: "Successfully updated profile",
        updatedUser,
      })
    } catch (error) {
      console.error("error", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = +req.params.id
      const token = req.headers.authorization

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Token not provided" })
      }

      try {
        const decoded = verify(token, "butuan1997")
        const authenticatedUserId = (decoded as any).user.id
        console.log("Received Token:", token)

        if (authenticatedUserId !== +userId) {
          return res.status(403).json({
            message: "Forbidden: You can only delete your own account",
          })
        }
      } catch (error) {
        console.error("Token Verification Error:", error)
        return res.status(401).json({ message: "Unauthorized: Invalid token" })
      }

      const userToDelete = await this.userRepository.findOne({
        where: { id: userId },
      })
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" })
      }

      // Delete the user
      await this.userRepository.remove(userToDelete)

      return res.status(200).json({
        message: "Successfully deleted profile",
      })
    } catch (error) {
      console.error("error", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async check(req: Request, res: Response): Promise<any> {
    try {
      const loginSession = res.locals.loginSession

      const user = await this.userRepository.findOne({
        where: { id: loginSession.user.id },
      })

      return res.status(200).json({
        message: "token is valid",
        user,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error while check token on service` })
    }
  }

  async findSuggestedUsers(loggedInUserId: string): Promise<User[]> {
    try {
      // Parse loggedInUserId to integer
      const userIdAsNumber = parseInt(loggedInUserId, 10)

      // Check if the parsed userId is a valid number
      if (isNaN(userIdAsNumber) || !Number.isInteger(userIdAsNumber)) {
        console.error("Invalid loggedInUserId:", loggedInUserId)
        throw new Error("Invalid loggedInUserId")
      }

      const suggestedUsers = await this.userRepository.find({
        where: {
          id: Not(userIdAsNumber),
        },
      })

      return suggestedUsers
    } catch (error) {
      console.error("Error fetching suggested users:", error)
      throw new Error("Invalid loggedInUserId")
    }
  }
})()
