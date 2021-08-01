import MeetupsDao from "../daos/meetups.dao"
import { CRUD } from "../../common/interfaces/crud.interface"
import { CreateMeetupDto } from "../dtos/create.meetup.dto"
import { PutMeetupDto } from "../dtos/put.meetup.dto"
import { PatchMeetupDto } from "../dtos/patch.meetup.dto"

class MeetupsService implements CRUD {
  async create(resource: CreateMeetupDto) {
    return MeetupsDao.addMeetup(resource)
  }

  async deleteById(id: string) {
    return MeetupsDao.removeMeetupById(id)
  }

  async list(limit: number, page: number) {
    return MeetupsDao.getMeetups()
  }

  async patchById(id: string, resource: PatchMeetupDto) {
    return MeetupsDao.patchMeetupById(id, resource)
  }

  async readById(id: string) {
    return MeetupsDao.getMeetupById(id)
  }

  async putById(id: string, resource: PutMeetupDto) {
    return MeetupsDao.putMeetupById(id, resource)
  }
}

export default new MeetupsService()
