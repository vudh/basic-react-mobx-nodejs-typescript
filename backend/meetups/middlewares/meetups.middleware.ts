import express from "express"
import meetupService from "../services/meetups.service"
import debug from "debug"

const log: debug.IDebugger = debug("app:users-controller")
class MeetupsMiddleware {
  async validateRequiredMeetupBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.title && req.body.image) {
      next()
    } else {
      res.status(400).send({
        error: `Missing required fields title and image`,
      })
    }
  }

  async validateMeetupExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const meetup = await meetupService.readById(req.params.meetupId)
    if (meetup) {
      next()
    } else {
      res.status(404).send({
        error: `Meetup ${req.params.meetupId} not found`,
      })
    }
  }

  async extractMeetupId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.meetupId
    next()
  }
}

export default new MeetupsMiddleware()
