import { CreateMeetupDto } from "../dtos/create.meetup.dto"
import { PatchMeetupDto } from "../dtos/patch.meetup.dto"
import { PutMeetupDto } from "../dtos/put.meetup.dto"
import shortid from "shortid"
import debug from "debug"

const log: debug.IDebugger = debug("app:in-memory-dao")

class MeetupsDao {
  meetups: Array<CreateMeetupDto> = []

  constructor() {
    log("Created new instance of MeetupsDao")
  }

  async addMeetup(meetup: CreateMeetupDto) {
    meetup.id = shortid.generate()
    this.meetups.push(meetup)
    return meetup.id
  }

  async getMeetups() {
    return this.meetups
  }

  async getMeetupById(meetupId: string) {
    return this.meetups.find((meetup: { id: string }) => meetup.id === meetupId)
  }

  async putMeetupById(meetupId: string, meetup: PutMeetupDto) {
    const objIndex = this.meetups.findIndex((obj: { id: string }) => obj.id === meetupId)
    this.meetups.splice(objIndex, 1, meetup)
    return `${meetup.id} updated via put`
  }

  async patchMeetupById(meetupId: string, meetup: PatchMeetupDto) {
    const objIndex = this.meetups.findIndex((obj: { id: string }) => obj.id === meetupId)
    let currentMeetup = this.meetups[objIndex]
    const allowedPatchFields = ["title", "image", "address", "description"]
    for (let field of allowedPatchFields) {
      if (field in meetup) {
        // @ts-ignore
        currentMeetup[field] = meetup[field]
      }
    }
    this.meetups.splice(objIndex, 1, currentMeetup)
    return `${meetup.id} patched`
  }

  async removeMeetupById(meetupId: string) {
    const objIndex = this.meetups.findIndex((obj: { id: string }) => obj.id === meetupId)
    this.meetups.splice(objIndex, 1)
    return `${meetupId} removed`
  }
}

export default new MeetupsDao()
