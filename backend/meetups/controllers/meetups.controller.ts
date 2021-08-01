// we import express to add types to the request/response objects from our controller functions
import express from "express"

// we import our newly created user services
import meetupsService from "../services/meetups.service"

// we use debug with a custom context as described in Part 1
import debug from "debug"

const log: debug.IDebugger = debug("app:meetups-controller")
class MeetupsController {
  async listMeetups(req: express.Request, res: express.Response) {
    const users = await meetupsService.list(100, 0)
    res.status(200).send(users)
  }

  async getMeetupById(req: express.Request, res: express.Response) {
    const user = await meetupsService.readById(req.body.id)
    res.status(200).send(user)
  }

  async createMeetup(req: express.Request, res: express.Response) {
    const meetupId = await meetupsService.create(req.body)
    res.status(201).send({ id: meetupId })
  }

  async patch(req: express.Request, res: express.Response) {
    log(await meetupsService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    log(await meetupsService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeMeetup(req: express.Request, res: express.Response) {
    log(await meetupsService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new MeetupsController()
