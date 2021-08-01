import { CommonRoutesConfig } from "../common/common.routes.config"
import MeetupsController from "./controllers/meetups.controller"
import MeetupsMiddleware from "./middlewares/meetups.middleware"
import express from "express"
import meetupsController from "./controllers/meetups.controller"

export class MeetupsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MeetupsRoutes")
  }
  configureRoutes() {
    this.app.route(`/meetups`).get(MeetupsController.listMeetups).post(MeetupsMiddleware.validateRequiredMeetupBodyFields, MeetupsController.createMeetup)

    this.app.param(`meetupId`, MeetupsMiddleware.extractMeetupId)

    this.app.route(`/meetups/:meetupId`).all(MeetupsMiddleware.validateMeetupExists).get(meetupsController.getMeetupById).delete(meetupsController.removeMeetup).patch(meetupsController.patch)

    this.app.put(`/meetups/:meetupId`, [MeetupsMiddleware.validateRequiredMeetupBodyFields, MeetupsController.put])

    return this.app
  }
}
