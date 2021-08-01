export class MeetupBusiness {
  static getUrl() {
    return "http://localhost:5000/meetups"
  }

  static async loadMeetups() {
    const response = await fetch(this.getUrl())

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      console.error(message)
      return []
    }

    const data = await response.json()
    const meetups = []
    if (data) {
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key],
        }

        meetups.push(meetup)
      }
    }

    return meetups
  }

  static async addMeetup(meetupData) {
    const response = await fetch(this.getUrl(), {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      console.error(message)
      return false
    }
    return true
  }

  static async removeMeetup(meetupId) {
    const response = await fetch(`${this.getUrl()}/${meetupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      console.error(message)
      return false
    }
    return true
  }
}
